import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { ChatRoom } from "../../components/ChatRoom";

async function getRoomId(slug: string) {
  try {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    const room = response.data.room;
    if (!room) throw new Error("Room not found");
    return room.id;
  } catch (err) {
    console.error("Failed to fetch room:", err);
    throw err;
  }
}

export default async function ChatRoomm({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = params.slug;
  const roomId = await getRoomId(slug);

  return <ChatRoom id={roomId} />;
}
