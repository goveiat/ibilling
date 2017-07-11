
let styles = {
	li: {backgroundColor: '#f3f3f4', border: '1px solid #e7eaec', padding: 10},
	label: {fontWeight: 'bold'},
	containerList: {padding: 10}
}


var ItemConciliacao = function({memo, ordem, valor, data, checkNumber}){
	data = data.split(" ");
	data = data[0].split("-");
	data = data[2] + '/' + data[1] + '/' + data[0];
	let classe = Number(valor) > 0 ? 'text-success' : 'text-danger';
	return (
			<div className="panel panel-default">
			  <div className="panel-heading" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', 
    overflow: 'hidden', backgroundColor: '#f3f3f4', fontWeight: 'bold'}}>
			  {memo}
			  </div>
			  <div className="panel-body">
				<div className={`col-sm-12 ${classe}`}>
				 	<span style={styles.label}>Valor: </span>R$ {valor.toFixed(2)}
				</div>
				<div className="col-sm-12">
					<span style={styles.label}>Data: </span>{data}
				</div>
				<div className="col-sm-12">
					<span style={styles.label}>Documento: </span>{parseInt(checkNumber,10)}
				</div>
			  </div>
				<div className="panel-footer">
					<div className="row">
						<div className="col-sm-6">
							<span className="label label-info">{ordem+1}</span>
						</div>					
					</div>
				</div>			  
			</div>		
	)
}



class ListaConciliacao extends React.Component{

	render(){	
		
		return (
			<section >
				<div className="col-sm-6" style={styles.containerList}>
					{this.loadListTransOfx()}
				</div>		
				<div className="col-sm-6" style={styles.containerList}>
					{this.loadListTransManual()}			
				</div>				
			</section>
		)
	}


	loadListTransOfx(){
		let {transactions} = this.props.ofx.statement;
		if(transactions.length > 0){
			return transactions.map((item, k) => 
				<ItemConciliacao 
					key={k} 
					ordem={k} 
					valor={item.amount}
					data={item.date.date}
					checkNumber={item.checkNumber[0]}
					memo={item.memo} 
				/>);
		}else{
			return <div className="alert alert-danger">The .ofx file is invalid</div>
		}
	}

	loadListTransManual(){
		let {transManual} = this.props;
		if(transManual.length > 0){
			return transactions.map((item, k) => 
				<ItemConciliacao 
					key={k} 
					ordem={k} 
					valor={item.amount}
					data={item.date.date}
					checkNumber={item.checkNumber[0]}
					memo={item.memo} 
				/>);
		}else{
			return <div className="alert alert-danger">There are no manual changes regarding the period and account of this statement</div>
		}
	}	


}

window.ListaConciliacao = ListaConciliacao;

