import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import cardService from "../service/cardService";

const DeleteCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const deleteCard = async () => {
      try {
        await cardService.deleteCard(id);
        navigate("/my-cards");
      } catch {}
    };
    deleteCard();
  }, []);
  return null;
};
export default DeleteCard;
