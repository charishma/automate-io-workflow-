import "../WorkFlow/WorkFlow.css";
import React,  { useState }  from "react";
import {
    TextInput,Button,
} from 'carbon-components-react';
import {Add16,Delete16,Shuffle16,CheckmarkFilled32}  from '@carbon/icons-react';
import {useDispatch,useSelector } from 'react-redux';
import { push as pushRoute } from "connected-react-router";
import {PageRoutes} from '../Constants/constants';
import {getEditingWorkFlowItem}from '../duck/selectors';
import {addTaskNode, changeTaskStatus,saveWorkFlow} from '../duck/actions';

const TaskPane = ()=>{
  const dispatch = useDispatch();
  const workFlowItem = useSelector(getEditingWorkFlowItem);
const createTaskNode = ()=>{
  dispatch(addTaskNode());
};
const renderTaskNodeList = taskNode => {
  const status = (taskNode.status === 0 ? "PENDING":(taskNode.status === 1? "In Progress":
  (taskNode.status === 2?"COMPLETED":"PENDING")));
  let colorClass = '';
  if(status === "PENDING")
  {
    colorClass = 'grey';
  }else if(status === "In Progress")
  {
    colorClass = 'blue';
  }else {
    colorClass = 'green';
  }
  const changeStatus = (taskName)=>()=>{
    dispatch(changeTaskStatus({taskName}));
  }
  
  let checkmark_class = 'checkMark '+colorClass;
  return (
      <div className='rest' onClick={changeStatus(taskNode.name)}>
        <CheckmarkFilled32 className={checkmark_class}/>
      <div >
      <h4>{taskNode.name}</h4>
      <br />
      <p>{status}</p>
      <p>{taskNode.comment}</p>
      <br />
      </div>
      </div>
  );
};
const saveCurrentWorkFlow =()=>{
  dispatch(saveWorkFlow());
}
const taskNodeArray = workFlowItem?workFlowItem.tasknode:[];
    return (
        <div className="container">
          <div className="restfilter">
              <div>
                <TextInput className='searchContainer'
                  placeholder="Enter WorkFlow name"
                  //onChange={onchange}
                  defaultValue={workFlowItem?.name}
                />
              </div>
              {workFlowItem?.status === 1 &&
              <div>
              <Button className='taskFlowBtn shuffle' renderIcon={Shuffle16}  size="lg" >Shuffle</Button>
              </div>   }             
          <div>
              <Button className='taskFlowBtn danger' kind="danger" renderIcon={Delete16}  size="lg" >Delete</Button>
          </div>   
          <div>
              <Button className='taskFlowBtn secondary' renderIcon={Add16}  size="lg" onClick={createTaskNode}>Add Node</Button>
          </div>
          <div>
              <Button className='taskFlowBtn primary' name="primary" size="lg" onClick={saveCurrentWorkFlow}>Save</Button>
          </div>
            </div>
            <div className='restcontainer'>
            {taskNodeArray && taskNodeArray.map(taskNode => {
                        return renderTaskNodeList(taskNode);
                    })}
            </div>
          </div>
    )
};
export default TaskPane;