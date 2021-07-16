import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import validateDeck from './deck-validator.js';

class DeckRow extends React.Component {
    constructor() {
        super();
        this.state = {
            deckStatus: 'Validating'
        };
    }

    componentDidMount() {
        this.getDeckStatus();
    }

    getStatusName(status) {
        if(status.valid) {
            return 'Valid';
        } else if(status.valid === false) {
            return 'Invalid';
        }
        return 'Validating';
    }

    async getDeckStatus() {
        const gameMode = this.props.deck.format && this.props.deck.format.value ? this.props.deck.format.value : 'stronghold';
        const status = await validateDeck(this.props.deck, { includeExtendedStatus: false, gameMode });
        this.setState({
            deckStatus: this.getStatusName(status)
        });
    }

    render() {
        return (
            <div className={ this.props.active ? 'deck-row active' : 'deck-row' } key={ this.props.deck.name } onClick={ this.props.onClick }>
                <div className='col-xs-1 deck-image'><img className='deck-sm-mon' src={ '/img/mons/' + this.props.deck.faction.value + '.png' } /></div>
                <span className='col-xs-8 col-md-7 col-lg-9 deck-name'>{ this.props.deck.name }</span><span className='col-xs-2 col-md-3 col-lg-2 deck-status-label text-right pull-right'>{ this.state.deckStatus }</span>
                <div className='row small'>
                    <span className='col-md-7 deck-factionalliance'>{ this.props.deck.faction.name }{ this.props.deck.alliance && this.props.deck.alliance.name ? <span>/{ this.props.deck.alliance.name }</span> : null }</span>
                    <span className='col-xs-4 col-md-3 deck-date text-right pull-right'>{ moment(this.props.deck.lastUpdated).format('Do MMM YYYY') }</span>
                </div>
            </div>);
    }
}

DeckRow.displayName = 'DeckRow';
DeckRow.propTypes = {
    active: PropTypes.bool,
    deck: PropTypes.object,
    onClick: PropTypes.func
};

export default DeckRow;
