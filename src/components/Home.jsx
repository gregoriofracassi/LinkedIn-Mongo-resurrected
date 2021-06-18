import React from "react"
import JumboProfile from "./JumboProfile"
import { Container, Row, Col } from "react-bootstrap"
import Sidebar from "./Sidebar/Sidebar"
import CardProfile from "./CardProfile"
import About from "./AboutProfile"
import ExperienceContent from "./ExperienceContent"
import EducationContent from "./EducationContent"
import SkillsContent from "./SkillsContent"
import AccomplishmentsContent from "./AccomplishmentsContent"
import InterestsContent from "./InterestsContent"

class Home extends React.Component {
  state = {
    user: {},
    userExperiences: [],
  }

  userId =
    this.props.match.params.id === "me"
      ? "60cc390714e1940015400b79"
      : this.props.match.params.id

  componentDidMount = async () => {
    console.log(process.env.REACT_APP_ENDPOINT)
    try {
      const response = await fetch(
        `https://lnkdn-cln.herokuapp.com/profiles/${this.userId}`
      )
      if (response.ok) {
        const data = await response.json()
        this.setState({ user: data })
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }

    try {
      const xpResponse = await fetch(
        `https://lnkdn-cln.herokuapp.com/profiles/${this.userId}/experiences`
      )
      if (xpResponse.ok) {
        const xpData = await xpResponse.json()
        this.setState({ userExperiences: xpData })
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.match.params.id === this.props.match.params.id) {
      return
    }
    try {
      const response = await fetch(
        `https://lnkdn-cln.herokuapp.com/profiles/${this.userId}`
      )
      if (response.ok) {
        const data = await response.json()
        this.setState({ user: data })
      }
    } catch (error) {
      console.log(error)
    }

    // const userId =
    //   this.props.match.params.id === "me"
    //     ? this.state.user._id
    //     : this.props.match.params.id

    try {
      const xpResponse = await fetch(
        `https://lnkdn-cln.herokuapp.com/profiles/${this.userId}/experiences`
      )
      if (xpResponse.ok) {
        const xpData = await xpResponse.json()
        this.setState({ userExperiences: xpData })
      }
    } catch (error) {
      console.log(error)
    }
  }

  downloadCV = async () => {
    try {
      const pdfResponse = await fetch(
        `https://lnkdn-cln.herokuapp.com/profiles/${this.userId}/pdfDownload`
      )
      if (pdfResponse.ok) {
        console.log(pdfResponse)
        const win = window.open(pdfResponse.url, "_blank")
        console.log(win)
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Container className="profile-container">
        <Row>
          <Col xs={{ offset: 1, span: 10 }}>
            <Row>
              <Col xs={8} className="mt-5">
                <JumboProfile
                  isMe={this.props.match.params.id}
                  userId={this.state.user._id}
                  name={this.state.user.name}
                  surname={this.state.user.surname}
                  title={this.state.user.title}
                  area={this.state.user.area}
                  image={this.state.user.image}
                  downloadCV={this.downloadCV}
                />
                <CardProfile
                  title="About"
                  content={<About bio={this.state.user.bio} />}
                />
                <CardProfile
                  title="Experience"
                  user={this.state.user._id}
                  isMe={this.props.match.params.id}
                  content={
                    <ExperienceContent
                      experiences={this.state.userExperiences}
                      user={this.state.user._id}
                    />
                  }
                />
                <CardProfile title="Education" content={<EducationContent />} />
                <CardProfile
                  title={"Skills & Endorsements"}
                  content={<SkillsContent />}
                />
                <CardProfile
                  user={this.state.user._id}
                  title="Accomplishments"
                  content={<AccomplishmentsContent />}
                />
                <CardProfile
                  user={this.state.user._id}
                  title="Interests"
                  content={<InterestsContent />}
                />
              </Col>
              <Col xs={4}>
                <Sidebar />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home
