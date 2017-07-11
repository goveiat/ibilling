
let styles = {
	label: {fontWeight: 'bold'},
	containerList: {padding: 10},
	tit: {textOverflow: 'ellipsis', whiteSpace: 'nowrap', 
	    overflow: 'hidden', fontWeight: 'bold'}
}


var ItemConciliacao = function({desc, ordem, valor, data, id}){
	let classe = Number(valor) > 0 ? 'text-success' : 'text-danger';
	return (
			<div className="row">
				<div className="col-sm-6">
					<div className="panel panel-info">
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
				<div className="col-sm-6" >
					<div className="alert alert-info" style={{height: 133, textAlign: 'center', display: 'table', width:'100%'}}>
						<p style={{ display: 'table-cell', verticalAlign: 'middle' }}>Empty</p>
					</div>
				</div>
			</div>
		
	)
}


class ItemManual extends React.Component{

	constructor(props) {
	  super(props);
	  this.state = {
	    classe: 'info',
	  };
	}

	componentWillReceiveProps(next){
		if(next.sel != this.props.id){
			this.setState({classe: 'info'})
		}
	}
	
	render(){
		let {desc, ordem, valor, data, id} = this.props;
		let classe = Number(valor) > 0 ? 'text-success' : 'text-danger';

		return (
			<div className="col-sm-4" >
					<div 
					style={{cursor: 'pointer'}}
					onMouseOver={() => {
						if(this.props.sel != id){
							this.setState({classe: 'warning'})
						}						
					}}
					onMouseOut={() => {
						if(this.props.sel != id){
							this.setState({classe: 'info'})
						}
					}}
					onClick={() => {this.props.onSelect(id)}}
					className={`panel panel-${this.state.classe}`}>
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
			
		)		
	}

}

/*
				<div className="panel-footer">
					<div className="row">
						<div className="col-sm-6">
							<span className="label label-primary">{ordem+1}</span>
						</div>	
						<div className="col-sm-6" style={{textAlign: 'right'}}>
							<input type="checkbox" className="react-toggle" value="Keep" />
						</div>				
					</div>
				</div>	
 */

class ListaConciliacao extends React.Component{

	constructor(props) {
	  super(props);
	  this.state = {
	    sel: null,
	  };
	}


	onSelect(item){
		this.setState({sel: item})
	}

	render(){	
		
		return (
			<section >
			  <fieldset>
			    <legend>Manual Entry</legend>
				<div className="col-sm-12" style={styles.containerList}>
					{this.loadListTransManual()}
				</div>
			  </fieldset>	
			  <fieldset>
			    <legend>Bank Statement</legend>
				<div className="col-sm-12" style={styles.containerList}>
					{this.loadListTransOfx()}
				</div>
			  </fieldset>				
			</section>
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
						ordem={k} 
						valor={item.amount}
						data={data}
						id={item.checkNumber[0]}
						desc={item.memo} 
					/>
			});
		}else{
			return <div className="alert alert-danger">The .ofx file is invalid</div>
		}
	}

	loadListTransManual(){
		let {transManual} = this.props;
		let data = null;
		let val = null;
		if(transManual.length > 0){
			return transManual.map((item, k) => {
				val = item.type == 'Expense' ? -item.amount : item.amount;
				data = item.date.split("-");
				data = data[2] + '/' + data[1] + '/' + data[0];	
				return <ItemManual
					onSelect={(item) => {this.onSelect(item)}}
					sel={this.state.sel}
					key={k} 
					ordem={false} 
					valor={Number(val)}
					data={data}
					id={item.id}
					desc={item.description} 
				/>
			});
		}else{
			return <div className="alert alert-danger">There are no manual changes regarding the period and account of this statement</div>
		}
	}	


}

window.ListaConciliacao = ListaConciliacao;

