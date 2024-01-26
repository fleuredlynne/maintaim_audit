import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Form, Row, Col, Button } from 'react-bootstrap';
import Axios from 'axios'
import xImg from './img/a.jpg'
window.Buffer = window.Buffer || require("buffer").Buffer; 


class MyAdminArea extends React.Component {
    state = 
    {
        myID: '-',
        empName: "None",
        Arr1: [],
        file_detail: null
    }
    Base64 = null
    SubmitData = ()=>
    {
        const FD = new FormData()
        FD.append('upload_file',this.state.file_detail)
        Axios.post("http://192.168.1.10:3001/imageupload",FD)

        let str1 = "insert into tbl_emp values('" + this.state.myID + "','" + this.state.empName + "', ? )";
        Axios.post('http://192.168.1.10:3001/api/NonQuery_img', { mySQL: str1, myImg: xImg });
    }

    componentWillMount()
    {
        this.ReadData()
    }
    ReadData = ()=>
    {
        let str1 = 'select * from tbl_emp'
        Axios.get('http://192.168.1.10:3001/api/DataQuery',{ params: {sql: str1} }).then(
            (res)=>
            {
                this.setState({Arr1: res.data})
            }
        )
    }
    render() {
        return <div>
            {this.state.Arr1.length}
            <Alert variant="info">
                <Alert.Heading>AUDITS</Alert.Heading>
                <p>
                   MAINTAIM AUDITS <br />
                </p>
                <hr />
            </Alert>


            <Form>
                <Form.Group style={{ margin: '10px' }} as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Col sm="3 m-1">
                        <Form.Control size="lg" type="text" placeholder="Enter ID" onChange={(e)=> this.setState({myID: e.target.value})} />
                    </Col>
                    <Col sm="4 m-1">
                        <Form.Control size="lg" type="text" placeholder="Enter Name" onChange={(e)=> this.setState({empName: e.target.value})} />
                    </Col>

                    <Col sm="3 m-1">
                        <Form.Control size='lg' type="file" onChange={(e)=> this.setState({file_detail: e.target.files[0] })} />
                    </Col>

                    <Col sm="1 m-1" align='right'>
                        <Button size='lg' variant="primary" onClick={this.SubmitData}>
                            Submit
                        </Button>
                    </Col>
                </Form.Group>
            </Form>


            <Form>
                <Form.Group style={{ margin: '10px' }} as={Row} className="mb-3" controlId="formPlaintextEmail">
                        {
                        this.state.Arr1.map ( (val)=>
                        <Col sm="1 m-4">
                        <div style={{fontSize: '0px'}}>
                        {this.Base64 = new Buffer (val.myImg, 'basse64')}
                        </div>
                        <img width='150px' src={this.Base64} ></img>
                        <b>ID: {val.ID}</b>
                        <div>Name: {val.EMP_NAME}</div>
                        </Col>
                        )}
                </Form.Group>
            </Form>
        </div>;
    }
}


export default MyAdminArea;