import API from "./api";

const claimEndpoint = "https://sapphire.devfest.notkruse.dev/api/tickets/claims";

interface claimTicketFormData {
  gender: string;
  token: string;
  fullname: string;
  role: string;
  experience: string;
}

const claimTicket = async (formData: claimTicketFormData) => {
  try {
    const resp = await API.post(claimEndpoint, formData);

    if (resp.success) {
      return true;
    }

    return resp.message;
  } catch (error) {
    if (error instanceof Error) {
      return error.message ?? "Couldn't complete request! Hold your ISP or find KRUSE";
    }
    return "Couldn't complete request! Hold your ISP or find KRUSE";
  }
};

export default claimTicket;
