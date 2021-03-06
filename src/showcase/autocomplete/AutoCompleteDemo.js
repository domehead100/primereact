import React, {Component} from 'react';
import {AutoComplete} from '../../components/autocomplete/AutoComplete';
import {CountryService} from '../service/CountryService';
import {TabView, TabPanel} from '../../components/tabview/TabView';
import {CodeHighlight} from '../codehighlight/CodeHighlight';

export class AutoCompleteDemo extends Component {

    constructor() {
        super();
        this.state = { 
            countriesData: [] 
        };
        
        this.filterCountrySingle = this.filterCountrySingle.bind(this);
        this.filterBrands = this.filterBrands.bind(this);
        this.filterCountryMultiple = this.filterCountryMultiple.bind(this);
        this.countryservice = new CountryService();
    }

    componentDidMount() {
        this.countriesData = this.countryservice.getCountries(this);
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo'];
    }

    filterCountrySingle(event) {
        var results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredCountriesSingle: results });
    }

    filterBrands(event) {
        let results;

        if(event.query.length === 0) {
            results = [...this.brands];
        }
        else {
            results = this.brands.filter((brand) => {
                return brand.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
        
        this.setState({ filteredBrands: results });
    }

    filterCountryMultiple(event) {
        let results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        
        this.setState({ filteredCountriesMultiple: results });
    }

    itemTemplate(brand) {
        return (
            <div className="ui-helper-clearfix" style={{ borderBottom: '1px solid #D5D5D5' }}>
                <img alt={brand} src={`showcase/resources/demo/images/car/${brand}.png`} style={{ width: '32px', display: 'inline-block', margin: '5px 0 2px 5px' }} />
                <div style={{ fontSize: '18px', float: 'right', margin: '10px 10px 0 0' }}>{brand}</div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>AutoComplete</h1>
                        <p>AutoComplete is an input component that provides real-time suggestions when being typed.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <h3>Basic</h3>
                    <AutoComplete value={this.state.country} suggestions={this.state.filteredCountriesSingle} completeMethod={this.filterCountrySingle} field="name"
                        size={30} placeholder="Countries" minLength={1} onChange={(e) => this.setState({country: e.value})} />
                    <span style={{ marginLeft: '10px' }}>Country: {this.state.country ? this.state.country.name || this.state.country : 'none'}</span>

                    <h3>Advanced</h3>
                    <AutoComplete value={this.state.brand} suggestions={this.state.filteredBrands} completeMethod={this.filterBrands} size={30} minLength={1}
                        placeholder="Hint: type 'v' or 'f'" dropdown={true} itemTemplate={this.itemTemplate.bind(this)} onChange={(e) => this.setState({brand: e.value})} />
                    <span style={{ marginLeft: '50px' }}>Brand: {this.state.brand || 'none'}</span>

                    <h3>Multiple</h3>
                    <span className="ui-fluid">
                        <AutoComplete value={this.state.countries} suggestions={this.state.filteredCountriesMultiple} completeMethod={this.filterCountryMultiple}
                            minLength={1} placeholder="Countries" field="name" multiple={true} onChange={(e) => this.setState({countries: e.value})} />
                    </span>
                </div>

                <AutoCompleteDoc />
            </div>
        )
    }
}

class AutoCompleteDoc extends Component {

    shouldComponentUpdate(){
        return false;
    }

    render() {
        return (
            <div className="content-section source">
                <TabView>
                    <TabPanel header="Documentation">
                        <h3>Import</h3>
                        <CodeHighlight className="javascript">
                            {`
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';

`}
                        </CodeHighlight>

                        <h3>Getting Started</h3>
                        <p>AutoComplete requires a list of suggestions and a completeMethod to query for the results
                        in addition to the regular value and onChange properties of value binding.</p>
                        <CodeHighlight className="html">
                            {`
<AutoComplete value={this.state.brand} onChange={(e) => this.setState({brand: e.value})}
            suggestions={this.state.brandSuggestions} completeMethod={this.suggestBrands.bind(this)} />

`}
                        </CodeHighlight>

                        <CodeHighlight className="javascript">
                            {`
constructor() {
    super();
    this.state = {
        brandSuggestions: null
    };
    this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo'];
}

suggestBrands(event) {
    let results = this.brands.filter((brand) => {
         return brand.toLowerCase().startsWith(event.query.toLowerCase());
    });
    
    this.setState({ brandSuggestions: results });
}

render() {
    return (
        <AutoComplete value={this.state.brand} onChange={(e) => this.setState({brand: e.value})}
                    suggestions={this.state.brandSuggestions} completeMethod={this.suggestBrands.bind(this)} />
    );
}

`}
                        </CodeHighlight>
                        
                        <h3>Dropdown</h3>
                        <p>Enabling dropdown property displays a button next to the input field where click behavior of the button is defined using 
                            dropdownMode property that takes "blank" or "current" as possible values. 
                            "blank" is the default mode to send a query with an empty string whereas 
                            "current" setting sends a query with the current value of the input.</p>
                        
                        <CodeHighlight className="html">
{`
<AutoComplete dropdown={true} value={this.state.brand} onChange={(e) => this.setState({brand: e.value})}
            suggestions={this.state.brandSuggestions} completeMethod={this.suggestBrands.bind(this)} />

`}
                        </CodeHighlight>
                        
                        <h3>Multiple Mode</h3>
                        <p>Multiple mode is used to select more than one value from the autocomplete. In this case, value reference should be an array.</p>
                        <CodeHighlight className="html">
{`
<AutoComplete multiple={true} value={this.state.brands} onChange={(e) => this.setState({brands: e.value})}
            suggestions={this.state.brandSuggestions} completeMethod={this.suggestBrands.bind(this)} />

`}
                        </CodeHighlight>
                        
                        <h3>Objects</h3>
                        <p>AutoComplete can also work with objects using the field property that defines the label to display 
                        as a suggestion. The value passed to the model would still be the object instance of a suggestion. 
                        Here is an example with a Country object that has name and code fields such as &#123;name:"United States",code:"USA"&#125;.</p>
                        <CodeHighlight className="html">
{`
<AutoComplete field="name" value={this.state.brands} onChange={(e) => this.setState({brands: e.value})}
            suggestions={this.state.brandSuggestions} completeMethod={this.suggestBrands.bind(this)} />

`}
                        </CodeHighlight>
                        
                        <h3>Templating</h3>
                        <p>Custom content can be displayed using itemTemplate property that references a function which gets
                        the suggestion option and returns an element. Similarly selectedItemTemplate property is available
                        to customize the chips in multiple mode using the same approach.</p>
                        
                        <CodeHighlight className="html">
{`
<AutoComplete itemTemplate="this.brandTemplate" value={this.state.brand} onChange={(e) => this.setState({brand: e.value})}
            suggestions={this.state.brandSuggestions} completeMethod={this.suggestBrands.bind(this)} />

`}
                        </CodeHighlight>
                        
                        <CodeHighlight className="javascript">
{`
brandTemplate(brand) {
    //return custom element
}

`}
                        </CodeHighlight>
                        
                        <h3>Attributes</h3>
                        <div className="doc-tablewrapper">
                            <table className="doc-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Default</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>id</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Unique identifier of the element.</td>
                                    </tr>
                                    <tr>
                                        <td>value</td>
                                        <td>any</td>
                                        <td>null</td>
                                        <td>Value of the component.</td>
                                    </tr>
                                    <tr>
                                        <td>suggestions</td>
                                        <td>array</td>
                                        <td>null</td>
                                        <td>An array of suggestions to display.</td>
                                    </tr>
                                    <tr>
                                        <td>field</td>
                                        <td>any</td>
                                        <td>null</td>
                                        <td>Field of a suggested object to resolve and display.</td>
                                    </tr>
                                    <tr>
                                        <td>scrollHeight</td>
                                        <td>string</td>
                                        <td>200px</td>
                                        <td>Maximum height of the suggestions panel.</td>
                                    </tr>
                                    <tr>
                                        <td>dropdown</td>
                                        <td>boolean</td>
                                        <td>false</td>
                                        <td>Displays a button next to the input field when enabled.</td>
                                    </tr>
                                    <tr>
                                        <td>dropdownMode</td>
                                        <td>string</td>
                                        <td>blank</td>
                                        <td>Specifies the behavior dropdown button. Default "blank" mode sends an empty string and "current" mode sends the input value.</td>
                                    </tr>
                                    <tr>
                                        <td>multiple</td>
                                        <td>boolean</td>
                                        <td>false</td>
                                        <td>Specifies if multiple values can be selected.</td>
                                    </tr>
                                    <tr>
                                        <td>minLength</td>
                                        <td>number</td>
                                        <td>1</td>
                                        <td>Minimum number of characters to initiate a search.</td>
                                    </tr>
                                    <tr>
                                        <td>delay</td>
                                        <td>number</td>
                                        <td>300</td>
                                        <td>Delay between keystrokes to wait before sending a query.</td>
                                    </tr>
                                    <tr>
                                        <td>style</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Inline style of the component.</td>
                                    </tr>
                                    <tr>
                                        <td>className</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Style class of the component.</td>
                                    </tr>
                                    <tr>
                                        <td>inputStyle</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Inline style of the input field.</td>
                                    </tr>
                                    <tr>
                                        <td>inputClassName</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Inline style of the input field.</td>
                                    </tr>
                                    <tr>
                                        <td>placeholder</td>
                                        <td>string</td>
                                        <td>null</td>
                                        <td>Hint text for the input field.</td>
                                    </tr>
                                    <tr>
                                        <td>readonly</td>
                                        <td>boolean</td>
                                        <td>false</td>
                                        <td>When present, it specifies that the input cannot be typed.</td>
                                    </tr>
                                    <tr>
                                        <td>disabled</td>
                                        <td>boolean</td>
                                        <td>false</td>
                                        <td>When present, it specifies that the component should be disabled.</td>
                                    </tr>
                                    <tr>
                                        <td>maxlength</td>
                                        <td>number</td>
                                        <td>null</td>
                                        <td>Maximum number of character allows in the input field.</td>
                                    </tr>
                                    <tr>
                                        <td>size</td>
                                        <td>number</td>
                                        <td>null</td>
                                        <td>Size of the input field.</td>
                                    </tr>
                                    <tr>
                                        <td>appendTo</td>
                                        <td>any</td>
                                        <td>null</td>
                                        <td>Target element to attach the overlay, valid values are "body" or a local template variable of another element.</td>
                                    </tr>
                                    <tr>
                                        <td>tabindex</td>
                                        <td>number</td>
                                        <td>null</td>
                                        <td>Index of the element in tabbing order.</td>
                                    </tr>
                                    <tr>
                                        <td>itemTemplate</td>
                                        <td>function</td>
                                        <td>null</td>
                                        <td>Template function to return the content of a list item.</td>
                                    </tr>
                                    <tr>
                                        <td>selectedItemTemplate</td>
                                        <td>function</td>
                                        <td>null</td>
                                        <td>Template function to return the content of a selected item.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <h3>Events</h3>
                        <div className="doc-tablewrapper">
                            <table className="doc-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Parameters</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>completeMethod</td>
                                        <td>
                                            event.originalEvent: browser event <br />
                                            event.query: Value to search with
                                        </td>
                                        <td>Callback to invoke to search for suggestions.</td>
                                    </tr>
                                    <tr>
                                        <td>onChange</td>
                                        <td>event.originalEvent: Browser event <br />
                                            event.value: Value of the component</td>
                                        <td>Callback to invoke when autocomplete value changes.</td>
                                    </tr> 
                                    <tr>
                                        <td>onFocus</td>
                                        <td>event: Browser event</td>
                                        <td>Callback to invoke when autocomplete gets focus.</td>
                                    </tr> 
                                    <tr>
                                        <td>onBlur</td>
                                        <td>event: Browser event</td>
                                        <td>Callback to invoke when autocomplete loses focus.</td>
                                    </tr>                        
                                    <tr>
                                        <td>onSelect</td>
                                        <td>event.originalEvent: Browser event <br />
                                            event.value: Value of the component</td>
                                        <td>Callback to invoke when a suggestion is selected.</td>
                                    </tr>
                                    <tr>
                                        <td>onUnselect</td>
                                        <td>event.originalEvent: Browser event <br />
                                            event.value: Value of the component</td>
                                        <td>Callback to invoke when a selected value is removed.</td>
                                    </tr>
                                    <tr>
                                        <td>onDropdownClick</td>
                                        <td>
                                            event.originalEvent: browser event <br />
                                            event.query: Current value of the input field
                                        </td>
                                        <td>Callback to invoke to when dropdown button is clicked.</td>
                                    </tr>
                                    <tr>
                                        <td>onClick</td>
                                        <td>event: Browser event </td>
                                        <td>Callback to invoke on click.</td>
                                    </tr>
                                    <tr>
                                        <td>onDblClick</td>
                                        <td>event: Browser event</td>
                                        <td>Callback to invoke on double click.</td>
                                    </tr>
                                    <tr>
                                        <td>onMouseDown</td>
                                        <td>event: Browser event</td>
                                        <td>Callback to invoke to when a mouse button is pressed.</td>
                                    </tr>
                                    <tr>
                                        <td>onKeyUp</td>
                                        <td>event: Browser event</td>
                                        <td>Callback to invoke to when a key is released.</td>
                                    </tr>
                                    <tr>
                                        <td>onKeyPress</td>
                                        <td>event: Browser event</td>
                                        <td>Callback to invoke to when a key is pressed.</td>
                                    </tr>
                                    <tr>
                                        <td>onContextMenu</td>
                                        <td>event: Browser event</td>
                                        <td>Callback to invoke on right-click.</td>
                                    </tr>
                                    <tr>
                                        <td>onClear</td>
                                        <td>event: Browser event</td>
                                        <td>Callback to invoke when input is cleared by the user.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>Styling</h3>
                        <p>Following is the list of structural style classes</p>
                        <div className="doc-tablewrapper">
                            <table className="doc-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Element</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ui-autocomplete</td>
                                        <td>Container element</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-panel</td>
                                        <td>Overlay panel of suggestions.</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-items</td>
                                        <td>List container of suggestions.</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-item</td>
                                        <td>List item of a suggestion.</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-token</td>
                                        <td>Element of a selected item in multiple mode.</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-token-icon</td>
                                        <td>Close icon element of a selected item in multiple mode.</td>
                                    </tr>
                                    <tr>
                                        <td>ui-autocomplete-token-label</td>
                                        <td>Label of a selected item in multiple mode.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>Dependencies</h3>
                        <p>None.</p>
                    </TabPanel>

                    <TabPanel header="Source">
                        <a href="https://github.com/primefaces/primereact/tree/master/src/showcase/autocomplete" className="btn-viewsource" target="_blank">
                            <i className="fa fa-github"></i>
                            <span>View on GitHub</span>
                        </a>
                        <CodeHighlight className="javascript">
{`
import React, {Component} from 'react';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {CountryService} from '../service/CountryService';

export class AutoCompleteDemo extends Component {

    constructor() {
        super();
        this.state = { 
            countriesData: [] 
        };
        
        this.filterCountrySingle = this.filterCountrySingle.bind(this);
        this.filterBrands = this.filterBrands.bind(this);
        this.filterCountryMultiple = this.filterCountryMultiple.bind(this);
        this.countryservice = new CountryService();
    }

    componentDidMount() {
        this.countriesData = this.countryservice.getCountries(this);
        this.brands = ["Audi", "BMW", "Fiat", "Ford", "Honda", "Jaguar", "Mercedes", "Renault", "Volvo"];
    }

    filterCountrySingle(event) {
        var results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredCountriesSingle: results });
    }

    filterBrands(event) {
        let results;

        if(event.query.length === 0) {
            results = [...this.brands];
        }
        else {
            results = this.brands.filter((brand) => {
                return brand.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
        
        this.setState({ filteredBrands: results });
    }

    filterCountryMultiple(event) {
        let results = this.state.countriesData.filter((country) => {
            return country.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
        
        this.setState({ filteredCountriesMultiple: results });
    }

    itemTemplate(brand) {
        return (
            <div className="ui-helper-clearfix" style={{ borderBottom: "1px solid #D5D5D5" }}>
                <img alt={brand} src={"showcase/resources/demo/images/car/\${brand}.png"} style={{width: "32px", display: "inline-block"}} />
                <div style={{ fontSize: "18px", float: "right", margin: "10px 10px 0 0" }}>{brand}</div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h3>Basic</h3>
                <AutoComplete value={this.state.country} suggestions={this.state.filteredCountriesSingle} completeMethod={this.filterCountrySingle} field="name"
                    size={30} placeholder="Countries" minLength={1} onChange={(e) => this.setState({country: e.value})} />
                <span style={{ marginLeft: "10px" }}>Country: {this.state.country ? this.state.country.name || this.state.country : "none"}</span>

                <h3>Advanced</h3>
                <AutoComplete value={this.state.brand} suggestions={this.state.filteredBrands} completeMethod={this.filterBrands} size={30} minLength={1}
                    placeholder="Hint: type 'v' or 'f'" dropdown={true} itemTemplate={this.itemTemplate.bind(this)} onChange={(e) => this.setState({brand: e.value})} />
                <span style={{ marginLeft: "50px" }}>Brand: {this.state.brand || "none"}</span>

                <h3>Multiple</h3>
                <span className="ui-fluid">
                    <AutoComplete value={this.state.countries} suggestions={this.state.filteredCountriesMultiple} completeMethod={this.filterCountryMultiple}
                        minLength={1} placeholder="Countries" field="name" multiple={true} onChange={(e) => this.setState({countries: e.value})} />
                </span>
            </div>
        )
    }
}
`}
                        </CodeHighlight>
                    </TabPanel>
                </TabView >
            </div>
        )
    }
}