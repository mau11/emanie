import React from 'react';
import ReactDOM from 'react-dom';
import { IndexLink, Link } from 'react-router';

export default class PatGen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      craft: null,
      product: null,
      size: null,
      pattern: null,
      tools: null,
      yarn: null,
      pic: './img/defaultPattPic.jpg'
    };
  }

  noPatterns() {
    alert('No patterns currently available in this size, check back soon.');
  }

  generateKnit() {
    this.noPatterns();
  }

  generateCrochet() {
    this.setState({craft: 'Crochet'}, function(){
      if(this.state.product === 'Scarf'){
        if(this.state.size === 'Baby 3-6 months'){
          this.noPatterns();
        } else if(this.state.size === 'Toddler'){
          this.setState({tools: 'N/15 (10.00mm) hook'}, function(){
            this.setState({yarn: 'doubled, worsted weight yarn'});
            this.setState({pattern: 'Infinity Scarf for toddlers. Ch 75, join ends. Rnd 1-5: dc around. Fasten off.' });
          });
        }
      }
      if(this.state.product === 'Beanie'){
        if(this.state.size === 'Baby 3-6 months'){
          this.setState({tools: 'I/9 (5.50mm) hook'}, function(){
            this.setState({pic: './img/babyBeanie.jpg'})
            this.setState({yarn: 'worsted weight yarn'});
            this.setState({pattern: 'Baby beanie size 3-6months. Ch 2 (you will be working in the round). Rnd 1: 5hdc (5sts). Rnd 2-4: 2hdc in each st (40sts). Rnd 5-13: hdc around (40sts). Rnd 14-15: * bpdc, fpdc, repeat from * around (40sts). Rnd 16: sc around (40sts). Fasten off.' });
          });
        } else if(this.state.size === 'Toddler'){
          this.noPatterns();
        }
      }
    });
  }

  handleGenerate(e) {
    e.preventDefault();
    if($('#craft').val() && $('#product').val() && $('#size').val() ){
      this.setState({product: $('#product').val()});
      this.setState({size: $('#size').val()});
      if($('#craft').val() === 'Knit'){
        this.generateKnit();
      } else {
        this.generateCrochet();
      }
      this.clearFields();
    } else {
      alert('Please select from all fields');
    }
  }

  clearFields() {
    $('#craft').val('-- Select a craft --');
    $('#product').val('-- Select a product --');
    $('#size').val('-- Select a size --');
  }

  render () {
    return (
      <div>
        <h3>Pattern Generator</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div>
                <h4>
                  <small>*All fields required</small>
                </h4>
                <form>
                  <div className="form-group">
                    <label>Craft</label>
                    <select className="form-control" id="craft">
                      <option disabled selected> -- Select a craft -- </option>
                      <option id="crochet">Crochet</option>
                      <option id="knit">Knit</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Product</label>
                    <select className="form-control" id="product">
                      <option disabled selected> -- Select a product -- </option>
                      <option id="beanie">Beanie</option>
                      <option id="scarf">Scarf</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Size</label>
                    <select className="form-control" id="size">
                      <option disabled selected> -- Select a size -- </option>
                      <option id="baby36">Baby 3-6 months</option>
                      <option id="toddler">Toddler</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-inverse" onClick={this.handleGenerate.bind(this)}>Generate</button>
                </form>
              </div>
            </div>
            <div className="col-sm-6">
              <h5><i>Generated Pattern:</i>
              </h5>
              <div>
                <div className="mainTitle">
                  <img className="avatarPics" src={this.state.pic}/>
                </div>
                <h4><b>Craft: </b> {this.state.craft}
                </h4>
                <h4><b>Tools: </b> {this.state.tools}
                </h4>
                <h4><b>Yarn: </b> {this.state.yarn}
                </h4>
                <h4><b>Instructions: </b>{this.state.pattern}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
