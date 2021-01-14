import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCandles} from '../store/candles'

// TODO=  give route name to route list

export class AllCandles extends React.Component {
  componentDidMount() {
    this.props.loadCandles()
  }

  render() {
    const {candles} = this.props

    return (
      <div className="list-view">
        {candles.map((candle) => {
          return (
            <div key={candle.id}>
              <div className="single-view">
                <img src={candle.imageUrl} />
                <div className="item-description">
                  <Link to={`/candles/${candle.id}`}>
                    <h2> {candle.name}</h2>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
const mapState = (state) => {
  return {
    candles: state.candles,
  }
}
const mapDispatch = (dispatch) => ({
  loadRobots: () => dispatch(fetchCandles()),
})

export default connect(mapState, mapDispatch)(AllCandles)