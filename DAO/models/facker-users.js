import { fakeUser } from "../controllers/test.controller.js";

export const router = Router();

router.get("/test", fakeUser);