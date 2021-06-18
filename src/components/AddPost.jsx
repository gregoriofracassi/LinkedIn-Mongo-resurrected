import { Card, Image, Button, Row, Col, Modal, Form } from "react-bootstrap"
import "../CardProfile.css"
import React from "react"

class AddPost extends React.Component {
  state = {
    text: "",
    post: undefined,
    show: false,
  }

  submitPost = async (e) => {
    e.preventDefault()
    try {
      console.log("gon be the body", {
        ...this.state.text,
        user: "60cc390714e1940015400b79",
        username: "admin",
      })
      let response = await fetch("https://lnkdn-cln.herokuapp.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: this.state.text.text,
          username: "admin",
        }),
      })

      if (response.ok) {
        if (this.state.post !== undefined) {
          const data = await response.json()
          console.log("this the image", this.state.post)
          let newResponse = await fetch(
            `https://lnkdn-cln.herokuapp.com/posts/${data}/imageupload`,
            {
              method: "POST",
              body: this.state.post,
            }
          )
          if (newResponse.ok) {
            console.log("File uploaded successfully")
          }
        } else {
          console.log("File was not uploaded!")
        }
      }
      this.onCloseModal()
      this.props.switch()
    } catch (error) {
      console.log(`Something went wrong! ${error}`)
    }
  }

  selectImage = (e) => {
    e.preventDefault()
    console.log(e.target.files[0])
    const file = e.target.files[0]
    let formData = new FormData()
    formData.append("cover", file)
    console.log(this.state.post)
    console.log(formData)
    this.setState({
      post: formData,
    })
  }

  onClickButton = (e) => {
    e.preventDefault()
    this.setState({ openModal: true })
  }
  onCloseModal = () => {
    this.setState({ openModal: false })
  }

  handleChange = (e) => {
    let id = e.target.id
    this.setState({
      text: { [id]: e.target.value },
    })
  }

  render() {
    return (
      <>
        <Card>
          <Card.Body className="d-flex ">
            <Image
              src={this.props.image}
              height="50"
              width="50"
              roundedCircle
            />

            {/* <Button variant="secondary" size="md" block>
            Start a Post
          </Button> */}
            <>
              <Button
                onClick={this.onClickButton}
                id="postbutton"
                variant="outline"
                size="md"
                className="text-muted "
              >
                Start a Post
              </Button>

              <Modal show={this.state.openModal} onHide={this.onCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Create a post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group>
                    <Form.Control
                      id="text"
                      // value={props.text}
                      onChange={this.handleChange}
                      as="textarea"
                      rows={3}
                      placeholder="What do you want to talk about?"
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Body className="d-flex justify-content-between ">
                  <div className="addpostfooterbtn-section d-flex justify-content-between ">
                    <Button className="addpostfooterbtn mx-1">
                      <div id="selectimages">
                        <form
                          enctype="multipart/form-data"
                          method="post"
                          name="fileinfo"
                        >
                          <input
                            id="post-file"
                            type="file"
                            name="file"
                            onChange={this.selectImage}
                            required
                          />
                          <label for="post-file">
                            <Row>
                              <Col>
                                <i className="bi bi-card-image"></i>
                              </Col>
                            </Row>
                          </label>
                        </form>
                      </div>
                    </Button>

                    <Button className="addpostfooterbtn mx-1">
                      <Row>
                        <Col>
                          <i className="bi bi-camera-video-fill"></i>
                        </Col>
                      </Row>
                    </Button>

                    <Button className="addpostfooterbtn mx-1">
                      <Row>
                        <Col>
                          <i className="bi bi-calendar-event"></i>
                        </Col>
                      </Row>
                    </Button>

                    <Button className="addpostfooterbtn mx-1">
                      <Row>
                        <Col>
                          <i className="bi bi-blockquote-right"></i>
                        </Col>
                      </Row>
                    </Button>
                  </div>

                  <div className="addpostfooterbtn-section d-flex justify-content-between ">
                    <Button className="addpostfooterbtn mx-1">
                      <Row>
                        <Col>
                          <i className="bi bi-chat-text"></i>
                        </Col>
                        <Col className=" addposttext">
                          <span> Anyone</span>
                        </Col>
                      </Row>
                    </Button>
                  </div>

                  <div>
                    <Button
                      onClick={this.submitPost}
                      type="submit"
                      id="savepostbtn"
                      variant="outline"
                      size="md"
                      className="text-muted "
                    >
                      Post
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </>
          </Card.Body>
          <Card.Body>
            <div className="addpostfooterbtn-section d-flex justify-content-between ">
              <Button className="addpostfooterbtn mx-1">
                <Row>
                  <Col>
                    <i className="bi bi-card-image"></i>
                  </Col>
                  <Col className=" addposttext">
                    <span> Photo</span>
                  </Col>
                </Row>
              </Button>

              <Button className="addpostfooterbtn mx-1">
                <Row>
                  <Col>
                    <i className="bi bi-camera-video-fill"></i>
                  </Col>
                  <Col className=" addposttext">
                    <span> Video</span>
                  </Col>
                </Row>
              </Button>

              <Button className="addpostfooterbtn mx-1">
                <Row>
                  <Col>
                    <i className="bi bi-calendar-event"></i>
                  </Col>
                  <Col className=" addposttext">
                    <span> Event</span>
                  </Col>
                </Row>
              </Button>

              <Button className="addpostfooterbtn mx-1">
                <Row>
                  <Col>
                    <i className="bi bi-blockquote-right"></i>
                  </Col>
                  <Col className=" addposttext">
                    <span> Article</span>
                  </Col>
                </Row>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default AddPost
