import HttpService from "./httpService";

export function createCard(card) {
  return HttpService.post("/cards", card);
}

export function getAll() {
  return HttpService.get("/cards/my-cards");
}
export function deleteCard(id) {
  return HttpService.delete(`/cards/${id}`);
}
export function getCard(id) {
  return HttpService.get(`/cards/${id}`);
}

export function updateCard(id, card) {
  return HttpService.put(`/cards/${id}`, card);
}

const cardService = {
  createCard,
  getAll,
  deleteCard,
  updateCard,
  getCard,
};
export default cardService;
