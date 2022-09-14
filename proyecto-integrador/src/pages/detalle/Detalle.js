import React, {Component} from 'react'
import "./Detalle.css"

 export default class Detalle extends Component {
    constructor(props) {
        super(props)
        this.state={
            id: this.props.match.params.id,
            detalle: {},
            favoritos: [],
            boton: []
        }
    }

componentDidMount(){
    this.setState({favoritos: JSON.parse(localStorage.getItem('favoritos')) || ['']})

    fetch(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=c0945689b0a582e110971301d6ea8be2&language=es`)
    .then(res => res.json())
    .then(data => {
        console.log (data)
            return this.setState({
                detalle : data,
                boton: JSON.parse(localStorage.getItem('favoritos')).some((fav)=> fav.id === this.state.detalle.id)
            })
    })
    .catch(err => console.log(err))
}

handleFavoritos(card){
    if (this.state.favoritos.some(fav => card.id === fav.id)) {
        this.setState({favoritos: this.state.favoritos.filter(item => item.id !== card.id)}, () => {
            localStorage.setItem("favoritos", JSON.stringify(this.state.favoritos))
        })
        console.log(this.state.favoritos.filter(item => item.id !== card.id))
    } else {
        this.setState({favoritos: [...this.state.favoritos, card]}, () => {
            localStorage.setItem("favoritos", JSON.stringify(this.state.favoritos))
        })
    }
}

handleButton(){
    this.setState({boton: !this.state.boton}, ()=>{this.handleFavoritos(this.state.detalle)})
}

render(){

    let img = 'https://image.tmdb.org/t/p/w342'
    
    return (
    <>
    <section>
    <h1>Detalle de {this.state.detalle.title}</h1>
    
    
    <section className='cardContainer'>
        <article className='item-card-detail2'>
            <img src={`${img}${this.state.detalle.poster_path}`}alt="imagen" />
        </article>
        <article className= 'item-card-detail'>
            <p>Rating: {this.state.detalle.vote_average}</p>
            <p>Fecha de estreno: {this.state.detalle.release_date}</p>
            <p>Duración: {this.state.detalle.runtime} minutos</p>
            <p>Sinópsis: {this.state.detalle.overview}</p>
            {/* <p>Género: {this.state.detalle.genre}</p> */}
            <button className='buttonFav' onClick={()=> this.handleButton()}>{this.state.boton ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}</button>
        </article> 
    </section>
    </section>   
    </>
    )
}
}