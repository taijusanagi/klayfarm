using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
// using Newtonsoft.Json; 

public class GameManager : MonoBehaviour
{

    public float interval = 5f;
    private string apiBaseUrl = "https://2023-klaymakers.vercel.app/api/items?id=";

    private string id;
    void Start()
    {
        int pm = Application.absoluteURL.IndexOf("?");
        if (pm != -1)
        {
            string queryParams = Application.absoluteURL.Split('?')[1];
            string[] parameters = queryParams.Split('&');
            foreach (string param in parameters)
            {
                if (param.StartsWith("id="))
                {
                    id = param.Substring(3);
                    Debug.Log("id: " + id);
                    InvokeRepeating("FetchItems", 0, interval);
                    break;
                }
            }
        }
        else
        {
            Debug.Log("No query parameters provided");
        }
    }

    void FetchItems()
    {
        if (!string.IsNullOrEmpty(id))
        {
            Debug.Log("Fetching items for id: " + id);
            StartCoroutine(GetDataFromAPI());

        }
        else
        {
            Debug.Log("Item ID is not set");
        }
    }


    IEnumerator GetDataFromAPI()
    {
        using (UnityWebRequest webRequest = UnityWebRequest.Get(apiBaseUrl + id))
        {
            // Send the request and wait for the response
            yield return webRequest.SendWebRequest();

            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.Log("Error: " + webRequest.error);
            }
            else
            {
                ProcessResponse(webRequest.downloadHandler.text);
            }
        }
    }

    private void ProcessResponse(string jsonResponse)
    {
        Debug.Log("Response: " + jsonResponse);
        // try
        // {
        //     // Deserialize JSON to dynamic object
        //     dynamic items = JsonConvert.DeserializeObject(jsonResponse);

        //     // Loop through the array
        //     foreach (var item in items)
        //     {
        //         string itemName = item[0];
        //         if (itemName == "Tomato")
        //         {
        //             Debug.Log("do");
        //         }
        //     }
        // }
        // catch (System.Exception e)
        // {
        //     Debug.LogError("Error processing JSON: " + e.Message);
        // }
    }
}
