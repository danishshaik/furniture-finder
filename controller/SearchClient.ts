import { CameraCapturedPicture } from "expo-camera"
import api from "./api"

interface SearchClient {
    searchFromImage(image: CameraCapturedPicture): Promise<SearchResult[]>;
}

const searchClient: SearchClient = {
    async searchFromImage(image: CameraCapturedPicture): Promise<SearchResult[]> {
        const formData = new FormData();
        formData.append('image', {
          uri: image.uri,
          name: 'image.jpg',
          type: 'image/jpeg',
        } as unknown as Blob);
        try {
            const searchResponse: SearchResult[] = await api.post('/search', formData);
            return searchResponse
        } catch (error) {
            console.log(error);
            return []
        }
    }
}

export default searchClient;