import React from 'react'
import classes from './BuildControls.css'
import BuilderControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];


const buildControls = (props) => (

    <div className={classes.BuildControls}>
        <p>Current Price:  <strong>$ {props.price.toFixed(2)}</strong></p>
        {controls.map((control, index) => {
            return (
                <BuilderControl
                    key={index}
                    label={control.label}
                    onAdd={() => props.added(control.type)}
                    onRemove={() => props.removed(control.type)}
                    disabled={props.disabled[control.type]}
                />
            )
        })}

        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.onOrderHandler}
        >
            ORDER NOW
        </button>

    </div>
)

export default buildControls 