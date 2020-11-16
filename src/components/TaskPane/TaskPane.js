import "../WorkFlow/WorkFlow.css";
import React,  { useState }  from "react";
import {
    TextInput,Button,
} from 'carbon-components-react';
import {Add16,Delete16,Shuffle16}  from '@carbon/icons-react';
import {useDispatch,useSelector } from 'react-redux';
import { push as pushRoute } from "connected-react-router";
import {PageRoutes} from '../Constants/constants';
const TaskPane = ()=>{
    return (
        <div className="container">
          <div className="restfilter">
              <div>
                <TextInput className='searchContainer'
                  placeholder="Enter WorkFlow name"
                  //onChange={onchange}
                />
              </div>
              <div>
              <Button className='taskFlowBtn shuffle' renderIcon={Shuffle16}  size="lg" >Shuffle</Button>
          </div>               
          <div>
              <Button className='taskFlowBtn danger' kind="danger" renderIcon={Delete16}  size="lg" >Delete</Button>
          </div>   
          <div>
              <Button className='taskFlowBtn secondary' renderIcon={Add16}  size="lg" >Add Node</Button>
          </div>
          <div>
              <Button className='taskFlowBtn primary' name="primary" size="lg" >Save</Button>
          </div>
            </div>
            <div className='restcontainer'>
            {/* {filteredWorkFlows.map(workFlow => {
                        return renderWorkFlowList(workFlow);
                    })} */}
            </div>
          </div>
    )
};
export default TaskPane;