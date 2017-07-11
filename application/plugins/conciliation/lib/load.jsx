
let styles = {
	li: {backgroundColor: '#f3f3f4', border: '1px solid #e7eaec', padding: 10},
	label: {fontWeight: 'bold'},
	containerList: {padding: 10}
}

//			  <span className="pull-right label label-info">{ordem+1}</span>

var ItemConciliacao = function({memo, ordem, valor, data, checkNumber}){
	data = data.split(" ");
	data = data[0].split("-");
	data = data[2] + '/' + data[1] + '/' + data[0];
	return (
			<div className="panel panel-default">
			  <div className="panel-heading" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', 
    overflow: 'hidden', backgroundColor: '#f3f3f4'}}>
			  {memo}
			  </div>
			  <div className="panel-body">
				<div className="col-sm-6">
				 	<span style={styles.label}>Valor: </span>R$ {valor}
				</div>
				<div className="col-sm-6">
					<span style={styles.label}>Data: </span>{data}
				</div>
				<div className="col-sm-6">
					<span style={styles.label}>Documento: </span>{parseInt(checkNumber,10)}
				</div>
				<div className="col-sm-6">
					<span style={styles.label}>ID: </span>
					<span className="label label-info">{ordem+1}</span>
				</div>				
			  </div>
			</div>		
	)
}



class ListaConciliacao extends React.Component{

	render(){
		let {transactions} = this.props.ofx.statement;
		return (
		<section style={{marginLeft: 25, marginRight: 25}}>
			<div className="col-sm-6" style={styles.containerList}>
				{transactions.map((item, k) => <ItemConciliacao 
					key={k} 
					ordem={k} 
					valor={item.amount}
					data={item.date.date}
					checkNumber={item.checkNumber[0]}
					memo={item.memo} />)}
			</div>		
			<div className="col-sm-6" style={styles.containerList}>
				{transactions.map((item, k) => <ItemConciliacao 
					key={k} 
					ordem={k} 
					valor={item.amount}
					data={item.date.date}
					checkNumber={item.checkNumber[0]}
					memo={item.memo} />)}			
			</div>				
		</section>
		)
	}


}

window.ListaConciliacao = ListaConciliacao;

