
let styles = {
	ul: {width: '50%',listStyleType: 'none'},
	li: {backgroundColor: '#f3f3f4', border: '1px solid #e7eaec', padding: 15},
	label: {marginRight: 10}
}

class ListaConciliacao extends React.Component{

	render(){
		let {transactions} = this.props.ofx.statement;
		return <ul style={styles.ul}>{transactions.map((item, k) => 
			<li style={styles.li} key={k}>
			<span className="label label-info" style={styles.label}>{k+1}</span>
			{item.memo}
			</li>)}
		</ul>
	}


}

window.ListaConciliacao = ListaConciliacao;

// ReactDOM.render(<ListaConciliacao />, document.getElementById('transacoes'));
