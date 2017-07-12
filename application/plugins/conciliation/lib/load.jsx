
let styles = {
	label: {fontWeight: 'bold'},
	containerList: {padding: 10},
	tit: {textOverflow: 'ellipsis', whiteSpace: 'nowrap', 
	    overflow: 'hidden', fontWeight: 'bold'}
}


class ItemConciliacao extends React.Component{

	constructor(props) {
	  super(props);
	  this.state = {
	    classe: 'info',
	    cursor: 'not-allowed',
	  };
	}

	render(){
		let {desc, ordem, valor, data, id, lang} = this.props;
		let classe = Number(valor) > 0 ? 'text-success' : 'text-danger';
		let classePanel = typeof this.props.conciliated == 'undefined' ? "info" : "warning";
		return (
			<div className="row">
				<div className="col-sm-6">
					<div className={`panel panel-${classePanel}`}>
					  <div className="panel-heading" style={styles.tit}>
					  {desc}
					  </div>
					  <div className="panel-body">
						<div className={`col-sm-12 ${classe}`}>
						 	<span style={styles.label}>{lang.p_concil_value}: </span>R$ {valor.toFixed(2)}
						</div>
						<div className="col-sm-12">
							<span style={styles.label}>{lang.p_concil_date}: </span>{data}
						</div>
						<div className="col-sm-12">
							<span style={styles.label}>{lang.p_concil_id}: </span>{parseInt(id,10)}
						</div>
					  </div>		  
					</div>
				</div>
				{this.showConciliated()}
			</div>
		
		)		
	}


	showConciliated(){
		let {lang} = this.props;

		if (typeof this.props.conciliated == 'undefined') {
			return (
				<div className="col-sm-6" >
					<div 
						onMouseOver={() => {
							if(this.props.sel != null){
								this.setState({classe: 'warning', cursor: 'pointer'})
							}						
						}}
						onMouseOut={() => {
							if(this.props.sel != null){
								this.setState({classe: 'info', cursor: 'not-allowed'})
							}
						}}
						onClick={() => {this.props.onConciliate(this.props.ordem)}}
						className={`alert alert-${this.state.classe}`} style={{height: 133, textAlign: 'center', display: 'table', width:'100%', cursor: this.state.cursor}}>
						<p style={{ display: 'table-cell', verticalAlign: 'middle' }}>{lang.p_concil_empty}</p>
					</div>
				</div>
			)
		} else {
			let item = this.props.conciliated;
			let data = item.date.split("-");
			data = data[2] + '/' + data[1] + '/' + data[0];
			let val = item.type == 'Expense' ? -item.amount : item.amount;
			val = Number(val);
			let classe = Number(val) > 0 ? 'text-success' : 'text-danger';
			return (
				<div className="col-sm-6" >
					<div className={`panel panel-warning`}>
					  <div className="panel-heading" style={styles.tit}>
					  {item.description}
					  </div>
					  <div className="panel-body">
						<div className={`col-sm-12 ${classe}`}>
						 	<span style={styles.label}>{lang.p_concil_value}: </span>R$ {val.toFixed(2)}
						</div>
						<div className="col-sm-12">
							<span style={styles.label}>{lang.p_concil_date}: </span>{data}
						</div>
						<div className="col-sm-12">
							<span style={styles.label}>{lang.p_concil_id}: </span>{parseInt(item.id,10)}
						</div>
					  </div>		  
					</div>					
				</div>
			)	
		}
	}
}


class ItemManual extends React.Component{

	constructor(props) {
	  super(props);
	  this.state = {
	    classe: 'info',
	  };
	}

	componentWillReceiveProps(next){
		if(next.sel != this.props.ordem){
			this.setState({classe: 'info'})
		}
	}
	
	render(){
		let {desc, ordem, valor, data, id, lang} = this.props;
		let classe = Number(valor) > 0 ? 'text-success' : 'text-danger';

		return (			
			<div 
			style={{cursor: 'pointer'}}
			onMouseOver={() => {
				if(this.props.sel != ordem){
					this.setState({classe: 'warning'})
				}						
			}}
			onMouseOut={() => {
				if(this.props.sel != ordem){
					this.setState({classe: 'info'})
				}
			}}
			onClick={() => {this.props.onSelect(ordem)}}
			className={`panel panel-${this.state.classe}`}>
			  <div className="panel-heading" style={styles.tit}>
			  {desc}
			  </div>
			  <div className="panel-body">
				<div className={`col-sm-12 ${classe}`}>
				 	<span style={styles.label}>{lang.p_concil_value}: </span>R$ {valor.toFixed(2)}
				</div>
				<div className="col-sm-12">
					<span style={styles.label}>{lang.p_concil_date}: </span>{data}
				</div>
				<div className="col-sm-12">
					<span style={styles.label}>{lang.p_concil_id}: </span>{parseInt(id,10)}
				</div>
			  </div>		  
			</div>
			
		)		
	}

}


class ListaConciliacao extends React.Component{

	constructor(props) {
	  super(props);

	  this.state = {
	    sel: null,
	    conciliated: {},
	    conciliatedForm: {},
	    transManual: props.transManual,
	  };
	}


	onSelect(kManual){
		this.setState({sel: kManual})
	}

	onConciliate(kOfx){
		if(this.state.sel != null){
			let {sel, conciliated, transManual, conciliatedForm} = this.state;
			conciliated[kOfx] = transManual[sel];
			conciliatedForm[kOfx] = transManual[sel]['id'];

			transManual[sel] = null;

			this.setState({sel: null, conciliated, transManual, conciliatedForm});
			$('#conciliated').val(JSON.stringify(conciliatedForm));
		}
	}



	render(){	

		let {lang} = this.props;
		
		return (
			<section >
			  <fieldset>
			    <legend>{lang.p_concil_account_info}</legend>
			    <div  style={styles.containerList}>
				{this.loadBankStatement()}
				</div>
			  </fieldset>			
			  <fieldset>
			    <legend>{lang.p_concil_manual_t}</legend>
				<div className="row" style={styles.containerList}>
					{this.loadListTransManual()}
				</div>
			  </fieldset>	
			  <fieldset>
			    <legend>{lang.p_concil_bank_statement}</legend>
				<div  style={styles.containerList}>
					{this.loadListTransOfx()}
				</div>
			  </fieldset>				
			</section>
		)
	}

	loadBankStatement(){
		let {lang} = this.props;

		let {agencyNumber, accountNumber, balance, statement, bank} = this.props.ofx;
		let start = statement.startDate.date.split(" ");
					start = start[0].split("-");
					start = start[2] + '/' + start[1] + '/' + start[0];
		let end = statement.endDate.date.split(" ");
					end = end[0].split("-");
					end = end[2] + '/' + end[1] + '/' + end[0];					
		balance = Number(balance[0]);
		return (
			<div className="row" style={{marginBottom: 20}}>
				<div className="col-sm-4">
					<span style={styles.label}>{lang.p_concil_agency}: </span>{agencyNumber[0]}
				</div>
				<div className="col-sm-4">
					<span style={styles.label}>{lang.p_concil_account}: </span>{accountNumber[0]}
				</div>	
				<div className="col-sm-4">
					<span style={styles.label}>{lang.p_concil_bank}: </span>{bank[0]}
				</div>				
				<div className="col-sm-4">
					<span style={styles.label}>{lang.p_concil_balance}: </span>R$ {balance.toFixed(2)}
				</div>
				<div className="col-sm-4">
					<span style={styles.label}>{lang.p_concil_start_date}: </span>{start}
				</div>	
				<div className="col-sm-4">
					<span style={styles.label}>{lang.p_concil_end_date}: </span>{end}
				</div>	
				<div className="col-sm-4">
					<span style={styles.label}>{lang.p_concil_transactions}: </span>{statement.transactions.length}
				</div>
			</div>
		)
	}


	loadListTransOfx(){
		let {p_concil_value, p_concil_date, p_concil_id, p_concil_empty} = this.props.lang;
		let {transactions} = this.props.ofx.statement;
		let data = null;	
		if(transactions.length > 0){
				return transactions.map((item, k) => {
					data = item.date.date.split(" ");
					data = data[0].split("-");
					data = data[2] + '/' + data[1] + '/' + data[0];					
					return <ItemConciliacao 
						key={k} 
						sel={this.state.sel}
						ordem={k} 
						valor={item.amount}
						data={data}
						id={item.checkNumber[0]}
						desc={item.memo} 
						conciliated={this.state.conciliated[k]}
						onConciliate={(kOfx)=>{this.onConciliate(kOfx)}}
						lang={{ p_concil_value, p_concil_date, p_concil_id, p_concil_empty}}
					/>
			});
		}else{
			return <div className="alert alert-danger">{this.props.lang.p_concil_invalid_ofx}</div>
		}
	}

	loadListTransManual(){
		let {transManual} = this.state;
		let data = null;
		let val = null;
		let {p_concil_value, p_concil_date, p_concil_id} = this.props.lang;

		if(transManual.length > 0){
			return transManual.map((item, k) => {
				if(!item){
					return null;
				}
				val = item.type == 'Expense' ? -item.amount : item.amount;
				data = item.date.split("-");
				data = data[2] + '/' + data[1] + '/' + data[0];	
				return (
					<div key={k}  className="col-sm-4" >
						<ItemManual
							onSelect={(item) => {this.onSelect(item)}}
							sel={this.state.sel}							
							ordem={k} 
							valor={Number(val)}
							data={data}
							id={item.id}
							desc={item.description} 
							lang={{ p_concil_value, p_concil_date, p_concil_id}}
						/>
					</div>
				)
					
			});
		}else{
			return <div className="alert alert-danger">{this.props.lang.p_concil_empty_manual}</div>
		}
	}	


}

window.ListaConciliacao = ListaConciliacao;

