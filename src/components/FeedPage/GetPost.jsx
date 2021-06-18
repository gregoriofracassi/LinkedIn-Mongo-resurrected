import React from "react"
import "./Post.css"

import {
  Container,
  Accordion,
  Dropdown,
  DropdownButton,
  Button,
  Col,
  Row,
  Card,
  InputGroup,
  Image,
  Form,
} from "react-bootstrap"
import { Link } from "react-router-dom"

class GetPost extends React.Component {
  state = {
    posts: [],
    comment: "",
    postId: "",
    switch: false,
  }

  componentDidMount = async () => {
    try {
      const response = await fetch(`https://lnkdn-cln.herokuapp.com/posts`)
      if (response.ok) {
        const data = await response.json()
        this.setState({ posts: data.posts })
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    try {
      if (prevProps.switch !== this.props.switch) {
        const response = await fetch(`https://lnkdn-cln.herokuapp.com/posts`)
        if (response.ok) {
          const data = await response.json()
          this.setState({ posts: data.posts })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  commentSubmit = async () => {
    try {
      let response = await fetch("https://lnkdn-cln.herokuapp.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: this.state.comment,
          post: this.state.postId,
        }),
      })
      this.setState({ switch: !this.state.switch })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <>
        {this.state.posts[0] &&
          this.state.posts.reverse().map((post) => {
            return (
              <Accordion defaultActiveKey="0">
                <Card className="mt-2 mb-2 getPost-card">
                  <Card.Header className="bg-white border-0">
                    <Row>
                      <Col className="float-left" xs={2}>
                        <Image className="getPost-img" src={post.user.image} />
                      </Col>
                      <Col xs={8} className="align-text-bottom">
                        <Link id="profilelinks" to={`/user/${post.user._id}`}>
                          <span className="getPost-person-name font-weight-bold">
                            {post.user.name} {post.user.surname}{" "}
                          </span>{" "}
                        </Link>
                        <span className="sidebar-span text-muted">
                          {" \u2022 "}
                        </span>
                        <span className="sidebar-span text-muted">2nd</span>
                        <br />
                        <span className="text-muted">{post.user.title}</span>
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
                            <i className="bi bi-link-45deg"></i> Copy Link
                            action
                          </Dropdown.Item>
                          <Dropdown.Item href="#">
                            <i className="bi bi-eye-slash"></i> I don't want to
                            see this else here
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
                    <p>{post.text}</p>
                    <div>
                      <Card.Img src={post.image} />
                    </div>{" "}
                    <hr className="text-muted my-0 py-0" />
                    <Container>
                      <Row>
                        <Col xs={1}></Col>
                        <Col xs={11}>
                          {post.comments &&
                            post.comments.map((comm) => {
                              return (
                                <div className="mt-3">
                                  <p className="smllytext">{comm.comment}</p>
                                </div>
                              )
                            })}
                        </Col>
                      </Row>
                    </Container>
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
                              <i className="bi bi-input-cursor-text"></i>{" "}
                              Comment
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
                            src={post.user.image}
                          />
                        </Col>
                        <Col xs={10} className="align-text-bottom">
                          <InputGroup className="mb-3">
                            <Form.Control
                              type="email"
                              placeholder="Add a comment"
                              className="getPost-commentInput"
                              value={this.state.comment}
                              onChange={(e) =>
                                this.setState({
                                  comment: e.target.value,
                                  postId: post._id,
                                })
                              }
                            />
                            <div className="addpostfooterbtn-section d-flex justify-content-between ">
                              <Button className="addpostfooterbtn mx-1"></Button>
                            </div>
                            {/* <MediaModal id={props.id} /> */}

                            <Button
                              className="getPost-commentSend-btn mx-1"
                              type="button"
                              onClick={this.commentSubmit}
                            >
                              <i className="bi bi-reply"></i>
                            </Button>
                          </InputGroup>
                        </Col>
                      </Row>
                    </Accordion.Collapse>
                  </Card.Body>
                </Card>
              </Accordion>
            )
          })}
      </>
    )
  }
}

export default GetPost
