import axios from "axios";

export const propertyService = {
  getAll,
  getsingle,
  create,
  updateProperty,
  deleteProperty,
};

async function getAll(
  page: number,
  size: number,
  type?: string,
  search?: string
): Promise<any> {
  try {
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/properties`;

    const pagedParams: any = {
      _page: page,
      _limit: size,
    };
    if (type) pagedParams.type = type;
    if (search) pagedParams.title = search;

    const allParams: any = {};
    if (type) allParams.type = type;
    if (search) allParams.title = search;

    const [pagedResponse, allResponse] = await Promise.all([
      axios.get(baseUrl, { params: pagedParams }),
      axios.get(baseUrl, { params: allParams }),
    ]);
    const fullTotal = allResponse.data.length;

    return {
      data: pagedResponse.data,
      totalItems: fullTotal,
      totalPages: Math.ceil(fullTotal / size),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getsingle(propertyID: string): Promise<any> {
  try {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_BASE_URL}/properties/${propertyID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    let response = await axios(config);

    return response;
  } catch (e) {
    return e;
  }
}
async function create(propertyData: any): Promise<any> {
  try {
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_BASE_URL}/properties`,

      data: propertyData,
    };

    let response = await axios(config);

    return response;
  } catch (e) {
    return e;
  }
}
async function updateProperty(
  propertyID: string,
  propertyData: any
): Promise<any> {
  try {
    var config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_BASE_URL}/properties/${propertyID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: propertyData,
    };

    let response = await axios(config);

    return response;
  } catch (e) {
    return e;
  }
}

async function deleteProperty(propertyID: string): Promise<any> {
  try {
    var config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_BASE_URL}/properties/${propertyID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    let response = await axios(config);

    return response;
  } catch (e) {
    return e;
  }
}
