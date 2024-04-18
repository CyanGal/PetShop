import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Sidebar.css';

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    
      <Button variant="primary" onClick={handleShow} className="searchProductsBar" style={{backgroundColor:'#6e441aa7', borderColor:'#6e441aa7'}}><p id='sidebar-searchButton'>Search Products</p></Button>
      <Offcanvas show={show} onHide={handleClose} {...props} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="sidebar-title">Our Products</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
         <ul>
            <li className="sidebar-list">
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:'#d6ad85', borderColor:'#d6ad85a7'}} href='/dogproducts'>Dog Products </Dropdown.Toggle>
          {/* <Dropdown.Menu>
           <Dropdown.Item href="/dogtoys" >Dog Toys</Dropdown.Item>
           <Dropdown.Item href="/dogfood">Dog Food</Dropdown.Item>
           <Dropdown.Item href="/dogaccessories">Dog Accessories</Dropdown.Item>
        </Dropdown.Menu> */}
        </Dropdown>
            </li>
            &nbsp;
            <li>
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:'#d6ad85', borderColor:'#d6ad85a7'}} href='/catproducts'>Cat Products </Dropdown.Toggle>
          {/* <Dropdown.Menu>
           <Dropdown.Item href="/cattoys">Cat Toys</Dropdown.Item>
           <Dropdown.Item href="/catfood">Cat Food</Dropdown.Item>
           <Dropdown.Item href="/cataccessories">Cat Accessories</Dropdown.Item>
        </Dropdown.Menu> */}
        </Dropdown>
            </li>
            &nbsp;
             <li>
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:'#d6ad85', borderColor:'#d6ad85a7'}} href='birdproducts'>Bird Products </Dropdown.Toggle>
          {/* <Dropdown.Menu>
           <Dropdown.Item href="/birdtoys">Bird Toys</Dropdown.Item>
           <Dropdown.Item href="/birdfood">Bird Food</Dropdown.Item>
           <Dropdown.Item href="/birdaccessories">Bird Accessories</Dropdown.Item>
        </Dropdown.Menu> */}
        </Dropdown>
            </li>
            &nbsp;
             <li>
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:'#d6ad85', borderColor:'#d6ad85a7'}} href='/fishproducts'>Fish Products </Dropdown.Toggle>
          {/* <Dropdown.Menu>
           <Dropdown.Item href="/fishtoys">Fish Toys</Dropdown.Item>
           <Dropdown.Item href="/fishfood">Fish Food</Dropdown.Item>
           <Dropdown.Item href="/fishaccessories">Fish Accessories</Dropdown.Item>
        </Dropdown.Menu> */}
        </Dropdown>
            </li>
         </ul>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
} export default OffCanvasExample
