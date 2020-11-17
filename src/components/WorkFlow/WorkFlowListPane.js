import React,  { useState }  from "react";
import {
    TextInput,Button,
} from 'carbon-components-react';
import styled from 'styled-components';
import "./WorkFlow.css";
import {Add16,CheckmarkFilled32,TrashCan32,Edit32}  from '@carbon/icons-react';
import {useDispatch,useSelector } from 'react-redux';
import { push as pushRoute } from "connected-react-router";
import {PageRoutes} from '../Constants/constants';
import {createWorkFlow,changeWorkflowStatus,editWorkFlowItem,deleteWorkItem} from '../duck/actions';
import{getWorkFlowList} from '../duck/selectors';

const WorkFlowListPane =()=>{
  
  const  [search,setSearchValue]=useState("");
  const [filterType,setFilterType]=useState('All');
  const  filterCategory = [{type:"All",value:"All"},{type:"Pending",value:0},{type:"Completed",value:2}];
  const dispatch = useDispatch();
  const workFlowList = useSelector(getWorkFlowList);

  const renderWorkFlowList = workFlow => {
    const status = (workFlow.status === 0 ? "PENDING": (workFlow.status === 2?"COMPLETED":"PENDING"));
  let colorClass = '';
  if(status === "PENDING")
  {
    colorClass = 'grey';
  }else {
    colorClass = 'green';
  }
  const changeStatus = (taskId)=>()=>{
    dispatch(changeWorkflowStatus({taskId}));
  };
  const removeWorkItem = (taskId)=>()=>{
    dispatch(deleteWorkItem({taskId}));
  }
  const editWorkItem = (taskId)=>()=>{
    dispatch(editWorkFlowItem({taskId}));
  }
  let checkmark_class = 'workFlowCheckMark '+colorClass;
  return (
      <div className='rest' onClick={changeStatus(workFlow.id)}>
        <Edit32 className='workFlowIcons editIcon' onClick={editWorkItem(workFlow.id)}/>
        <TrashCan32 className='workFlowIcons deleteIcon' onClick={removeWorkItem(workFlow.id)}/>
        <CheckmarkFilled32 className={checkmark_class}/>
      <div style={{padding:'10px'}}>
      <h4>{workFlow.name}</h4>
      <br />
      <p>{status}</p>
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
    setFilterType(e.target.value);
  }
  const onchange = e => {
    setSearchValue(e.target.value);
  };
//    const { search } = this.state;
    const filteredWorkFlows = workFlowList.filter(workFlow => {
      return (workFlow.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 &&
              (workFlow.status == filterType || filterType === 'All'))
    });

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
              {filterCategory.map(filterType => {
                return <option value={filterType.value}>{filterType.type}</option>;
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
