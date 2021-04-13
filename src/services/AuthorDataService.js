import http from "../http-common";

class AuthorDataService {
  get(id) {
    return http.get(`/authors/${id}`);
  }
}

export default new AuthorDataService();