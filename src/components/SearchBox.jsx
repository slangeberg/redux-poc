import React from 'react';

export default React.createClass({

    getInitialState: function () {
        return {
            isSelected: false,
            isMouseOverMenu: false,
            selection: "",
            textValue: "",
            items: ['Apples', 'Oranges', 'Mangoes']
        };
    },

    handleTextClick() {
        this.state.isSelected = true
        this.setState(this.state)
    },

    onMenuItemClick(e) {
        //console.log("item.click: ", e.target)
        console.log("item.click: ", e.target)

        this.state.selection = e.target.text
        this.state.textValue = e.target.text
        this.state.isSelected = false
        this.setState(this.state)
    },

    render: function () {
        const comp = this
        const filteredItems = this.state.textValue
            ? this.state.items.filter(item =>
                item.toLowerCase().indexOf(this.state.textValue.toLowerCase()) >= 0
            )
            : []
        return (
            <div>
                <div>
                    isSelected: {this.state.isSelected.toString()} <br/>
                    selection: {this.state.selection} <br/>
                    textValue: {this.state.textValue} <br/>
                    <br/>
                </div>
                <div>
                    Label: <br/>
                    <input defaultValue="Enter search..." value={this.state.textValue}
                           onClick={this.handleTextClick}
                           onBlur={e => {
                                console.log('input.blur');
                                if (!this.state.isMouseOverMenu) {
                                    this.state.isSelected = false
                                }
                                //this.state.textHasFocus = false
                                this.setState(this.state)
                            }}
                           onChange={e => {
                                console.log('input.onchg');
                                this.state.textValue = e.target.value
                                this.state.isSelected = true

                                this.setState(this.state)
                            }}
                    />
                    <div style={{
                            border: "solid .2em",
                            display: this.state.isSelected ? '' : 'none'
                         }}
                         onMouseOver={e => {
                            //console.log('menu.msovr');
                            this.state.isMouseOverMenu = true
                            this.setState(this.state)
                         }}
                         onMouseOut={e => {
                            //console.log('menu.msout');
                            //this.state.isMouseOverMenu = false
                            ////if (!this.state.textHasFocus) {
                            ////    this.state.isSelected = false
                            ////}
                            //this.setState(this.state)
                        }}>
                        <ul>
                            {filteredItems.map((item) => {
                                //console.log('item.. onMenuItemClick: ', comp.onMenuItemClick);
                                return (
                                    <li key={item}>
                                        <a href="#" onClick={this.onMenuItemClick}>{item}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <p>&nbsp;</p>
            </div>
        );
    }
});

