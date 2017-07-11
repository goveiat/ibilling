
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
		let {desc, ordem, valor, data, id} = this.props;
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
						 	<span style={styles.label}>Valor: </span>R$ {valor.toFixed(2)}
						</div>
						<div className="col-sm-12">
							<span style={styles.label}>Data: </span>{data}
						</div>
						<div className="col-sm-12">
							<span style={styles.label}>Identificação: </span>{parseInt(id,10)}
						</div>
					  </div>		  
					</div>
				</div>
				{this.showConciliated()}
			</div>
		
		)		
	}


	showConciliated(){
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
						<p style={{ display: 'table-cell', verticalAlign: 'middle' }}>Empty</p>
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
						 	<span style={styles.label}>Value: </span>R$ {val.toFixed(2)}
						</div>
						<div className="col-sm-12">
							<span style={styles.label}>Date: </span>{data}
						</div>
						<div className="col-sm-12">
							<span style={styles.label}>Identification: </span>{parseInt(item.id,10)}
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
		let {desc, ordem, valor, data, id} = this.props;
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
				 	<span style={styles.label}>Value: </span>R$ {valor.toFixed(2)}
				</div>
				<div className="col-sm-12">
					<span style={styles.label}>Date: </span>{data}
				</div>
				<div className="col-sm-12">
					<span style={styles.label}>Identification: </span>{parseInt(id,10)}
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
		
		return (
			<section >
			  <fieldset>
			    <legend>Bank Statement</legend>
			    <div  style={styles.containerList}>
				{this.loadBankStatement()}
				</div>
			  </fieldset>			
			  <fieldset>
			    <legend>Manual Entry</legend>
				<div className="row" style={styles.containerList}>
					{this.loadListTransManual()}
				</div>
			  </fieldset>	
			  <fieldset>
			    <legend>Bank Statement</legend>
				<div  style={styles.containerList}>
					{this.loadListTransOfx()}
				</div>
			  </fieldset>				
			</section>
		)
	}

	loadBankStatement(){
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
					<span style={styles.label}>Agency Number: </span>{agencyNumber[0]}
				</div>
				<div className="col-sm-4">
					<span style={styles.label}>Account Number: </span>{accountNumber[0]}
				</div>	
				<div className="col-sm-4">
					<span style={styles.label}>Bank: </span>{bank[0]}
				</div>				
				<div className="col-sm-4">
					<span style={styles.label}>Balance: </span>R$ {balance.toFixed(2)}
				</div>
				<div className="col-sm-4">
					<span style={styles.label}>Start Date: </span>{start}
				</div>	
				<div className="col-sm-4">
					<span style={styles.label}>End Date: </span>{end}
				</div>	
				<div className="col-sm-4">
					<span style={styles.label}>Transactions: </span>{statement.transactions.length}
				</div>
			</div>
		)
	}


	loadListTransOfx(){
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
					/>
			});
		}else{
			return <div className="alert alert-danger">The .ofx file is invalid</div>
		}
	}

	loadListTransManual(){
		let {transManual} = this.state;
		let data = null;
		let val = null;
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
						/>
					</div>
				)
					
			});
		}else{
			return <div className="alert alert-danger">There are no manual changes regarding the period and account of this statement</div>
		}
	}	


}

window.ListaConciliacao = ListaConciliacao;

