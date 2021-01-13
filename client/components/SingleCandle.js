import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCandle} from '../store/candles'

export class SingleCandle extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.candleId //make sure this checks out
    this.props.loadSingleCandle(id)
  }

  render() {
    const {candle} = this.props
    //console.log('in single candle render', candle)
    return (
      <div className="singleCandle">
        <h2>{candle.name}</h2>
        <h3>
          This {candle.color} candle will awaken your senses and remind you of
          your favorite {candle.theme}.
        </h3>
        <p>{candle.description}</p>
        <h4>Ingredients: {candle.ingredients}</h4>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    candle: state.singleCandle,
  }
}

const mapDispatch = (dispatch) => ({
  loadSingleCandle: (id) => dispatch(fetchSingleCandle(id)),
})
export default connect(mapState, mapDispatch)(SingleCandle)
