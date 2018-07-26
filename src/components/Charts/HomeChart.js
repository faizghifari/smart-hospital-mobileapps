import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Button
} from 'react-native';
import { Bar, Pie, Scatterplot, Radar } from 'react-native-pathjs-charts';

styles = StyleSheet.create({
    cardContainer: {
        marginTop: 10,
        flexDirection: 'column',
        flex: 0.95,
        backgroundColor: '#3498db',
        elevation: 3,
        shadowOffset: { width: 0, height: 2, },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 2,
        marginBottom: 8,
    },
    titleText: {
        paddingBottom: 5,
        paddingTop: 5,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    legendText: {
        fontSize: 12,
        textAlign: 'center',
    },
    detail: {
        flex: 0.25,
        flexDirection: 'column',
    },
    textDetail: {
        flex: 0.25
    }
})


export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: "detail"
        }
    }
    detailHandle() {
        if (this.state.detail == 'detail') {
            this.setState({
                detail: 'chart'
            })
        } else {
            this.setState({
                detail: 'detail'
            })
        }
    }

    render() {
        let data = [
            [{
                "v": 49,
                "name": "S"
            }, {
                "v": 42,
                "name": "S"
            }],
            [{
                "v": 69,
                "name": "P"
            }, {
                "v": 62,
                "name": "P"
            }],
            [{
                "v": 29,
                "name": "S"
            }, {
                "v": 15,
                "name": "S"
            }]
        ]

        let dataP = [{
            "name": "Washington",
            "population": 7694980
        }, {
            "name": "Oregon",
            "population": 2584160
        }, {
            "name": "Minnesota",
            "population": 6590667
        }, {
            "name": "Alaska",
            "population": 7284698
        }]

        let options = {
            width: 300,
            height: 300,
            margin: {
                top: 20,
                left: 25,
                bottom: 50,
                right: 20
            },
            color: '#2980B9',
            gutter: 20,
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    color: 'white',
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    color: 'white',
                    fill: '#34495E'
                }
            }
        }

        let optionsP = {
            margin: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            },
            width: 350,
            height: 350,
            color: '#2980B9',
            r: 50,
            R: 150,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                color: '#ECF0F1'
            }
        }

        let dataR = [{
            "speed": 74,
            "balance": 29,
            "explosives": 40,
            "energy": 40,
            "flexibility": 30,
            "agility": 25,
            "endurance": 44
        }]

        let optionsR = {
            width: 290,
            height: 290,
            margin: {
                top: 20,
                left: 20,
                right: 30,
                bottom: 20
            },
            r: 150,
            max: 100,
            fill: "#2980B9",
            stroke: "#2980B9",
            animate: {
                type: 'oneByOne',
                duration: 200
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 14,
                fontWeight: true,
                fill: '#34495E',
                color: 'white'
            }
        }

        let dataS = [
            [{
                "title": "Amapá",
                "rating": 4.47,
                "episode": 0
            }, {
                "title": "Santa Catarina",
                "rating": 3.3,
                "episode": 1
            }, {
                "title": "Minas Gerais",
                "rating": 6.46,
                "episode": 2
            }, {
                "title": "Amazonas",
                "rating": 3.87,
                "episode": 3
            }, {
                "title": "Mato Grosso do Sul",
                "rating": 2.8,
                "episode": 4
            }, {
                "title": "Mato Grosso do Sul",
                "rating": 2.05,
                "episode": 5
            }, {
                "title": "Tocantins",
                "rating": 7.28,
                "episode": 6
            }, {
                "title": "Roraima",
                "rating": 5.23,
                "episode": 7
            }, {
                "title": "Roraima",
                "rating": 7.76,
                "episode": 8
            }, {
                "title": "Amazonas",
                "rating": 2.26,
                "episode": 9
            }, {
                "title": "Mato Grosso do Sul",
                "rating": 2.46,
                "episode": 10
            }, {
                "title": "Santa Catarina",
                "rating": 7.59,
                "episode": 11
            }, {
                "title": "Acre",
                "rating": 3.74,
                "episode": 12
            }, {
                "title": "Amapá",
                "rating": 5.03,
                "episode": 13
            }, {
                "title": "Paraíba",
                "rating": 4.16,
                "episode": 14
            }, {
                "title": "Mato Grosso",
                "rating": 0.81,
                "episode": 15
            }, {
                "title": "Rio de Janeiro",
                "rating": 3.01,
                "episode": 16
            }, {
                "title": "Rio de Janeiro",
                "rating": 0,
                "episode": 17
            }, {
                "title": "Distrito Federal",
                "rating": 5.46,
                "episode": 18
            }, {
                "title": "São Paulo",
                "rating": 9.71,
                "episode": 19
            }, {
                "title": "Mato Grosso",
                "rating": 7.9,
                "episode": 20
            }, {
                "title": "Tocantins",
                "rating": 4.2,
                "episode": 21
            }, {
                "title": "Amapá",
                "rating": 6,
                "episode": 22
            }, {
                "title": "Paraná",
                "rating": 7.99,
                "episode": 23
            }, {
                "title": "Mato Grosso do Sul",
                "rating": 1.07,
                "episode": 24
            }, {
                "title": "Tocantins",
                "rating": 1.42,
                "episode": 25
            }, {
                "title": "Paraná",
                "rating": 5.94,
                "episode": 26
            }, {
                "title": "Maranhão",
                "rating": 3.17,
                "episode": 27
            }, {
                "title": "Maranhão",
                "rating": 1.58,
                "episode": 28
            }, {
                "title": "Rondônia",
                "rating": 6.12,
                "episode": 29
            }, {
                "title": "Roraima",
                "rating": 7.28,
                "episode": 30
            }, {
                "title": "Mato Grosso",
                "rating": 4.74,
                "episode": 31
            }, {
                "title": "Roraima",
                "rating": 1.47,
                "episode": 32
            }, {
                "title": "Alagoas",
                "rating": 9,
                "episode": 33
            }, {
                "title": "Amazonas",
                "rating": 0.43,
                "episode": 34
            }, {
                "title": "Mato Grosso do Sul",
                "rating": 8.61,
                "episode": 35
            }, {
                "title": "Tocantins",
                "rating": 0.6,
                "episode": 36
            }, {
                "title": "Maranhão",
                "rating": 9.62,
                "episode": 37
            }, {
                "title": "Rio de Janeiro",
                "rating": 4.79,
                "episode": 38
            }, {
                "title": "Santa Catarina",
                "rating": 7.71,
                "episode": 39
            }, {
                "title": "Piauí",
                "rating": 3.83,
                "episode": 40
            }, {
                "title": "Pernambuco",
                "rating": 8.19,
                "episode": 41
            }, {
                "title": "Bahia",
                "rating": 6.98,
                "episode": 42
            }, {
                "title": "Minas Gerais",
                "rating": 4.52,
                "episode": 43
            }]
        ]

        let optionsS = {
            width: 290,
            height: 290,
            r: 2,
            margin: {
                top: 20,
                left: 40,
                bottom: 30,
                right: 30
            },
            fill: "white",
            stroke: "#f0932b",
            animate: {
                type: 'delayed',
                duration: 200
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#fdcb6e'
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#fdcb6e',
                    color: 'white'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#fdcb6e',
                    color: 'white'
                }
            }
        }


        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Bar width={150} height={150} data={data} options={options} accessorKey='v' pallete={[
                        { 'r': 16, 'g': 172, 'b': 132 }, { 'r': 240, 'g': 147, 'b': 43 }, { 'r': 192, 'g': 57, 'b': 43 }]} />
                    <Pie
                        width={150} height={150}
                        data={dataP}
                        options={optionsP}
                        R={60}
                        r={0}
                        accessorKey="population" 
                        pallete={[
                            { 'r': 155, 'g': 89, 'b': 182 }, //rgb(52, 73, 94) rgb(240, 147, 43)
                            { 'r': 52, 'g': 152, 'b': 219 }, //rgb(52, 152, 219)
                            { 'r': 243, 'g': 156, 'b': 18 }, //rgb(243, 156, 18)
                            { 'r': 52, 'g': 73, 'b': 94 }]}/>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Scatterplot width={150} height={150} data={dataS} options={optionsS} xKey="episode" yKey="rating" />
                    <Bar width={150} height={150} data={data} options={options} accessorKey='v' pallete={[
                    { 'r': 52, 'g': 73, 'b': 94 },//rgb(127, 140, 141)
                     { 'r': 52, 'g': 152, 'b': 219 }, { 'r': 127, 'g': 140, 'b': 141 }]}  />
                </View>


            </View>
        )
    }
}