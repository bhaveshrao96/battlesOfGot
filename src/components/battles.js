import '../res/public/css/style.css';
import logo from '../res/public/gotLogo.jpg';
import cross from '../res/public/x-mark.svg';
import rightArrow from '../res/public/right-arrow.svg';
import leftArrow from '../res/public/left-arrow.svg';
import React, { Component } from 'react';
import battles from '../battles.json';
import { Accordion, Card, Form } from 'react-bootstrap';

class GOTBattles extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            tableHeads: [{
                'Name': 'name',
                'Year': 'year',
                'Number': 'battle_number',
                'Attacker King': 'attacker_king',
                'Defender King': 'defender_king',
                'Att 1': 'attacker_1',
                'Attacker Commander': 'attacker_commander',
                'Def 1': 'defender_1',
                'Defender Commander': 'defender_commander',
                'Location': 'location',
            },
            ],
            search: '',
            allBattles: battles,
            battleData: battles,
            battleCount: 0,
            totalBattles: 0,
            startIndex: 0,
            endIndex: 4,
            filterBy: [],
            allLocations: [],
            isLocationsAdded: false,
            count: 100,
            clicked: false

        }
        this.nextClicked = this.nextClicked.bind(this);
        this.previousClicked = this.previousClicked.bind(this);
        this.searchBattle = this.searchBattle.bind(this);
        this.getCount = this.getCount.bind(this);
        this.getList = this.getList.bind(this);
        this.autocompleteSelected = this.autocompleteSelected.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.searchByObj = this.searchByObj.bind(this);

    }

    getList() {
        let locationArray = []
        this.state.battleData.map((battleData) => {

            locationArray.push(battleData.location);
        })
        this.setState({
            allLocations: locationArray
        })
        if (this.state.isLocationsAdded == false) {
            this.setState({
                isLocationsAdded: true
            })
        } else {
            this.setState({
                isLocationsAdded: false
            })
        }
        console.log(this.state.allLocations);

    };
    getCount() {
        console.log(this.state.allLocations.length)
    }
    clearSearch() {
        this.setState({
            search: ''
        }, () => {
            this.searchBattle(this.state.search)
        })

    }

    renderBattleData() {
        var startValue = this.state.startIndex;
        var endValue = this.state.endIndex;
        return this.state.battleData.slice(startValue, endValue).map((battles) => {
            const { name, year, battle_number, attacker_king, defender_king, attacker_1, attacker_commander, defender_1, defender_commander, location } = battles //destructuring
            return (
                <tr>
                    <td>{name}</td>
                    <td>{year}</td>
                    <td>{battle_number}</td>
                    <td>{attacker_king}</td>
                    <td>{defender_king}</td>
                    <td>{attacker_1}</td>
                    <td>{attacker_commander}</td>
                    <td>{defender_1}</td>
                    <td>{defender_commander}</td>
                    <td>{location}</td>
                </tr>
            )
        })
    }
    autocompleteSelected(loc) {
        console.log(loc)
        this.setState({
            search: loc,
        })
        this.searchBattle(loc)
    }
    renderAutoCompleteData() {
        var startValue = this.state.startIndex;
        var endValue = this.state.endIndex;
        return this.state.battleData.slice(startValue, endValue).map((battles) => {
            const { name, year, battle_number, attacker_king, defender_king, attacker_1, attacker_commander, defender_1, defender_commander, location } = battles //destructuring
            return (

                <li onClick={() => this.autocompleteSelected(location)}>{location}</li>

            )
        })
    }
    componentDidMount() {
        this.getList();
        this.getCount();
        this.setState({
            battleCount: this.state.battleData.length
        })
    }


    renderAllLocations() {
        return this.state.allLocations.map((locations) => {
            if (locations != '') {
                return (
                    <div className='location'>
                        {locations}
                    </div>)
            }

        })
        return
    }
    nextClicked() {


        if (this.state.endIndex < this.state.battleCount) {
            this.setState({
                startIndex: this.state.endIndex,
                endIndex: this.state.battleCount < this.state.endIndex + 4 ? this.state.battlesCount : this.state.endIndex + 4
            })
        }

    }
    previousClicked() {
        if (this.state.startIndex != 0) {
            this.setState({
                endIndex: this.state.startIndex,
                startIndex: this.state.startIndex - 4
            })
        }

    }
    renderTableHeader() {
        let header = Object.keys(this.state.tableHeads[0])
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }
    searchBattle(event) {
        let newArray = this.state.allBattles;

        let searchValue = event.toLowerCase();
        console.log(searchValue);
        this.setState({
            startIndex: 0,
            endIndex: 4,
            search: event
        });
        if (searchValue.length > 0) {

            this.setState({ search: searchValue });

            let searchedArray = newArray.filter((e) => e.location.toLowerCase().match(searchValue));
            console.log(searchedArray);

            this.setState({
                battleData: searchedArray,
                battleCount: searchedArray.length
            })


        } else {
            this.setState({
                battleData: newArray,
                battleCount: newArray.length
            })
        }
    };
    getCount() {
        this.setState({
            clicked: true,
            totalBattles: this.state.allBattles.length,
        })
    }

    searchByObj(obj) {
    
    }

    render() {
        let tableInfo;
        if (this.state.battleCount > 4) {
            tableInfo = <span> {this.state.startIndex + 1} - {this.state.endIndex} </span>;
        } else {
            tableInfo = <span> {this.state.battlesCount}  </span>;
        }
        return (
            <div className="row battles-page">
                <div className="battles-wrapper">
                    <div className="table-header">
                        <img className="got-image" src={logo} /> GOT Battles
                    </div>

                    <div className='row filter-row'>

                        <div className='col-md-12 search-row'>

                            <label>Search by Location</label>
                            <input value={this.state.search} onChange={(e) => { this.searchBattle(e.target.value) }} ></input>
                            {
                                this.state.search != '' ? <img onClick={this.clearSearch} src={cross} alt="" className="right-arrow" /> : null
                            }
                            {
                                this.state.search != '' ? <div className='auto-complete-wrapper'>
                                    <ul>
                                        {this.renderAutoCompleteData()}
                                    </ul>
                                </div> : null
                            }


                        </div>
                        <div className="res-table" >
                            <table className='battles' cellSpacing="0" cellPadding="0">
                                <tbody>
                                    <tr>{this.renderTableHeader()}</tr>
                                    {this.renderBattleData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bottom-section">
                        <img onClick={this.previousClicked} src={leftArrow} alt="" />
                        <div className='table-info'>
                            Showing
                            {tableInfo}
                              of
                             <span>{" " + this.state.battleCount}</span> results
                        </div>
                        <img onClick={this.nextClicked} src={rightArrow} alt="" className="right-arrow" />
                    </div>
                    <div className='row button-sec'>
                        <div className="col-md-6 col-sm-12">
                            <Accordion >
                                <Card className='acccordian-btn m-r-5'>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        Locations
                                </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body><div className='all-locations-wrapper'>
                                            {this.renderAllLocations()}
                                        </div></Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                            </Accordion>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <Accordion >
                                <Card className='acccordian-btn m-l-5'>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        Total Battles
                                 </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body><h4>
                                            Total Battles = {this.state.battleCount}

                                        </h4></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GOTBattles