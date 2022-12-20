import { useEffect, useState } from "react";
import cardService from "../service/cardService";

const useCard = (id) => {
  const [card, setCard] = useState(null);
  useEffect(() => {
    const getCard = async () => {
      const { data } = await cardService.getCard(id);
      setCard(data);
    };
    getCard();
  }, [id]);
  return card;
};
export default useCard;
