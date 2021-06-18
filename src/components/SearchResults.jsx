import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import CardProfile from "./CardProfile"
import SearchContent from "./SearchContent"

class SearchResults extends React.Component {
  state = {
    query: "",
    filteredProfiles: [],
  }

  query = `name=${this.props.match.params.query}`

  componentDidMount = async () => {
    try {
      const response = await fetch(
        `https://lnkdn-cln.herokuapp.com/profiles?${this.query}`
      )
      if (response.ok) {
        const data = await response.json()
        this.setState({ filteredProfiles: data.profiles })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={{ offset: 1, span: 10 }}>
            <Row>
              <Col xs={8} className="mt-5">
                <CardProfile
                  title="People"
                  content={
                    <SearchContent profiles={this.state.filteredProfiles} />
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default SearchResults
