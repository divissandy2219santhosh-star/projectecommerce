import React, { useEffect } from "react";
import products from "../../products";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card,Badge} from "react-bootstrap";
import Loader from "./loader";
import Message from "./message";
import { listProductDetails } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Form,Button,Container,Row,Col,ListGroup} from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();
  const { loading, error, product } = productDetails;

  const navigate = usenavigate();
  const location = useLocation();
  const [qty,setQty] =useState(1)


  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!product || !product.name) return <Message variant="info">Product not found</Message>;

const addToCartHandler=()=>{
  navigate('/backend/${id}?qty=${qty}')
}






  return (
    <>
      <div>
        <Link to="/" className="btn btn-dark my-3">
          Go Back
        </Link>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>
                  Rating : {product.rating} |No. of reviews {product.numReviews}
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Description : {product.description}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>Price : {product.price}</h3>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card className="p-4">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>

                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Category</Col>
                    <Col>{product.category}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Brand</Col>
                    <Col>{product.brand}</Col>
                  </Row>
                </ListGroup.Item>


                <ListGroup.Item>
                  <Row>
                    <Col>
                    
                    
                    <Button className="btn-block" disabled={product.countInStock==0} type='button'>

                        Add To Cart
                    </Button>
                    
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className="btn-block btn-success" disabled={product.countInStock==0} type='button' onClick={
                    addToCartHandler
                  }>addtocart</Button>
                </ListGroup.Item>

              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProductDetails;
