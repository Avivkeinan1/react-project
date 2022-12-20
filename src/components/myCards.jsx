import { useEffect, useState } from "react";
import PageHeader from "../common/pageHeader";
import cardService from "../service/cardService";
import { Link } from "react-router-dom";
import Card from "./card";
const MyCards = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const getCards = async () => {
      const { data } = await cardService.getAll();
      setCards(data);
    };

    getCards();
  }, []);

  return (
    <>
      <PageHeader title="My Cards" description="all of your cards is here" />

      <div className="row">
        <Link to="/create-card">Create a New Card</Link>
      </div>

      <div className="row">
        {!cards.length ? (
          <p> No Cards yet ...</p>
        ) : (
          cards.map((card) => <Card key={card._id} card={card} />)
        )}
      </div>
    </>
  );
};
export default MyCards;
