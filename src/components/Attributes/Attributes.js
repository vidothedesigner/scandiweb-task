import { PureComponent } from "react";

class Attributes extends PureComponent {
    selection(e) {
        e.target.parentNode.childNodes.forEach(node => {
            if(node.classList.contains('selected')) node.classList.remove('selected');
        })
        e.target.classList.add('selected');
    }

    displayAttributes(attributes) {
        return attributes.map((attribute, index) => (
            <div key={index} className="attributeContainer">
                <h3 className="attributeHeading">{ attribute.name }</h3>
                <div className="attributeSelection">
                    { attribute.items.map((item, index) => {
                        if(attribute.type === 'swatch') {
                            return (
                                <h2 key={ index } onClick={ e => this.selection(e) } style={{ backgroundColor: `${item.value}`}}>{ item.value }</h2>
                            )
                        }
                        return (
                            <h2 key={ index } onClick={ e => this.selection(e) }>{ item.displayValue }</h2>
                        )
                    }) }
                </div>
            </div>
        ))
    }
    render() { 
        let attributes = this.props.productAttributes;
        return ( 
        <>
            {this.displayAttributes(attributes.filter(attr => attr.type === "text"))}
            {this.displayAttributes(attributes.filter(attr => attr.type === "swatch"))}
        </> );
    }
}
 
export default Attributes;