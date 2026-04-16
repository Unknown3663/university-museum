import WorkshopsClient from "./WorkshopsClient";
import { getPublishedWorkshops } from "../../lib/publicData";

export default async function WorkshopsPage() {
  try {
    const workshops = await getPublishedWorkshops();

    return <WorkshopsClient initialWorkshops={workshops} />;
  } catch (error) {
    console.error("Failed to render workshops page:", error);

    return <WorkshopsClient initialWorkshops={[]} initialError />;
  }
}
