import React,  { useState }  from "react";
import {
    TextInput,Button,
} from 'carbon-components-react';
import styled from 'styled-components';
import "./WorkFlow.css";
import {Add16}  from '@carbon/icons-react';
import {useDispatch,useSelector } from 'react-redux';
import { push as pushRoute } from "connected-react-router";
import {PageRoutes} from '../Constants/constants';
import {createWorkFlow} from '../duck/actions';

const WorkFlowListPane =()=>{
  
  const  [search,setSearchValue]=useState("");
  const  filterCategory = ["All","Pending","Completed"];
  const dispatch = useDispatch();


  const renderWorkFlowList = workFlow => {
    //const { search } = this.state;
    let code = '';
    return (
        <div className='rest'>
        <div >
        <h4>Sample</h4>
        <br />
        <p>Test</p>
        <p>Test2</p>
        <br />
        </div>
        </div>
    );
  };
  const addWorkFlow=e=>{
    dispatch(createWorkFlow());
    //dispatch(pushRoute(PageRoutes.taskflow));

  }
  const optionSelected=(e)=>{

  }
  const onchange = e => {
    //this.setState({ search: e.target.value });
  };
//    const { search } = this.state;
    const filteredWorkFlows = [1,2,3,4];
    // countriesList.filter(country => {
    //   return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    // });

    return (
      <div >
        <main >
          <div className="container">
          <div className="restfilter">
              <div>
                <TextInput className='searchContainer'
                  placeholder="Search WorkFlows"
                  icon="search"
                  onChange={onchange}
                />
              </div>              
              <div>
            <select id="restfilter" onChange={optionSelected}>
              <option value="any">Choose Any</option>
              {filterCategory.map(type => {
                return <option value={type}>{type}</option>;
              })}
            </select>
          </div>
          <div>
              <Button className='workFlowBtn' renderIcon={Add16}  size="lg" onClick={addWorkFlow}>
                  Create WorkFlow</Button>
          </div>
            </div>
            <div className='restcontainer'>
            {filteredWorkFlows.map(workFlow => {
                        return renderWorkFlowList(workFlow);
                    })}
            </div>
          </div>
        </main>
      </div>
    );
  
}

export default WorkFlowListPane;
