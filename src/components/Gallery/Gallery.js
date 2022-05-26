import { PureComponent } from "react";

class Gallery extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '' 
        };
        this.getImageUrl = this.getImageUrl.bind(this);
    }

    getImageUrl(e) {
        this.setState({ imageUrl: e.target.src });
    }

    componentDidUpdate() {
        document.querySelector('.largeImage').firstChild.src = this.state.imageUrl;
    }
    
    render() { 
        let gallery = this.props.productGallery;
        return ( 
            <div className="producImages">
                { gallery.length > 1 && <div className="thumbnails">
                    { gallery.map((image, i) => {
                        return <img key={ i } src={ image } alt='' onClick={ this.getImageUrl } />
                    }) }
                </div> }
                <div className="largeImage">
                    <img src={ gallery[0] } alt='' />   
                </div>
            </div>
         );
    }
}
 
export default Gallery;