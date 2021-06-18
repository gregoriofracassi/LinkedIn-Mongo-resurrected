import React from "react"
import "./Post.css"
import {
  Card,
  Col,
  Row,
  Image,
  InputGroup,
  FormControl,
  Button,
  Form,
  Accordion,
  DropdownButton,
  Dropdown,
} from "react-bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import { Link } from "react-router-dom"

class PostCard extends React.Component {
  state = {
    comment: {},
  }

  render() {
    return (
      <Accordion defaultActiveKey="0">
        <Card className="mt-2 mb-2 getPost-card">
          <Card.Header className="bg-white border-0">
            <Row>
              <Col className="float-left" xs={2}>
                <Image className="getPost-img" src={this.props.image} />
              </Col>
              <Col xs={8} className="align-text-bottom">
                <Link id="profilelinks" to={`/user/${this.props.profile._id}`}>
                  <span className="getPost-person-name font-weight-bold">
                    {this.props.firstname} {this.props.lastname}{" "}
                  </span>{" "}
                </Link>
                <span className="sidebar-span text-muted">{" \u2022 "}</span>
                <span className="sidebar-span text-muted">2nd</span>
                <br />
                <span className="text-muted">{this.props.title}</span>
                <br />
                <span className="text-muted">{this.props.updatedDate}</span>
              </Col>
              <Col className="float-right" xs={1}>
                <DropdownButton
                  className="getPost-dropDown-button rounded-circle"
                  as={InputGroup.Prepend}
                  variant="outline-none-secondary"
                  title={<i className="bi bi-three-dots"></i>}
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item href="#">
                    <i className="bi bi-bookmark"></i> Save
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    <i className="bi bi-link-45deg"></i> Copy Link action
                  </Dropdown.Item>
                  <Dropdown.Item href="#">
                    <i className="bi bi-eye-slash"></i> I don't want to see this
                    else here
                  </Dropdown.Item>

                  <Dropdown.Item href="#">
                    <i className="bi bi-megaphone"></i> Report
                  </Dropdown.Item>
                </DropdownButton>
                <Button className="bg-white border-0"></Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="py-0">
            <p>{this.props.text}</p>
            <div>
              <Card.Img src={this.props.postimage} />
            </div>{" "}
            <hr className="text-muted my-0 py-0" />
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              <Col className="getPost-comment-section ">
                <Button className="getPost-like-btn mx-1">
                  <Row>
                    <span>
                      <i className="bi bi-hand-thumbs-up"></i> Like
                    </span>
                  </Row>
                </Button>

                <Button className="getPost-comment-btn mx-1">
                  <Row>
                    <span>
                      <i className="bi bi-input-cursor-text"></i> Comment
                    </span>
                  </Row>
                </Button>

                <Button className="getPost-share-btn mx-1">
                  <Row>
                    <span>
                      <i className="bi bi-folder-symlink"></i> Share
                    </span>
                  </Row>
                </Button>

                <Button className="getPost-send-btn mx-1">
                  <Row>
                    <span>
                      <i className="bi bi-cursor"></i>
                      Send
                    </span>
                  </Row>
                </Button>
              </Col>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Row className="mt-3">
                <Col xs={2}>
                  <Image
                    className="getPost-comment-img"
                    src={this.props.profilepic}
                  />
                </Col>
              </Row>
            </Accordion.Collapse>
          </Card.Body>
        </Card>
      </Accordion>
    )
  }
}

export default PostCard
