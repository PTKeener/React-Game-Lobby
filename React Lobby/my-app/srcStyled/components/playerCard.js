import React, { Component } from 'react'
import Select from 'react-select'
import { useState } from "react"
import colorContext from './colorContext'

import Container from '@material-ui/core/Container'

const Card = ({id}) => {
    const [oldColor, setOldColor] = useState(null);
    const [color, setColor] = useState("grey")

    const styles = {
        root: {
            textAlign: 'left',
            width: '300px',
            height: '250px',
            margin: '40px auto',
            padding: '20px',
            border: '1px solid',
            backgroundColor: color
        }
    }
    const colorStyles = {
        option: (styles, {data, isDisabled, isFocused, isSelected}) => {
            return {
                ...styles,
                backgroundColor: isFocused ? `light${color}` : color,
                color: isFocused ? "black" : "white",
            }
        },
        menuList: base => ({
            ...base,
            padding: 0,
        })
    }

    return (
        <Container style={styles.root}>
            <colorContext.Consumer>
            {(context) => {
                return(
                    <Container>
                        <p>P{id}</p>
                        <hr/>
                        {console.log(context)}
                        <Select options={context.options} styles={colorStyles} onChange={(inputValue) => {
                            if(oldColor != null)
                            {
                                context.flipUsed(oldColor.value);
                                //oldColor.used = false;
                            }
                            context.flipUsed(inputValue.value)
                            //inputValue.used = true;

                            setColor(inputValue.value);
                            setOldColor(inputValue);
                            context.setOptions(context.colors.filter(colors => colors.used === false))
                            //console.log(context.colors)
                        }}/>
                    </Container>
                )
            }}
            </colorContext.Consumer>
        </Container>
    )
}

export default Card