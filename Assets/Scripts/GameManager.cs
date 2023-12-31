using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
// using Newtonsoft.Json; 

public class GameManager : MonoBehaviour
{
    private string id;
    private string apiBaseUrl = "https://2023-klaymakers.vercel.app/api/items?id=";
    private List<GameObject> instantiatedObjects = new List<GameObject>(new GameObject[9]);
    
    public float interval = 5f;

    public GameObject plantPrefab;



    void Start()
    {
        StartCoroutine(GetDataFromAPI());
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
            StartCoroutine(GetDataFromAPI());
        }
        else
        {
            Debug.Log("Item ID is not set");
        }
    }


    IEnumerator GetDataFromAPI()
    {
        Debug.Log("Fetching data from " + apiBaseUrl + id);
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
        Debug.Log("jsonResponse:" + jsonResponse);        // Deserialize JSON
        ItemList itemList = JsonUtility.FromJson<ItemList>(jsonResponse);
        for (int i = 0; i < itemList.items.Length; i++)
        {
            GameObject current = instantiatedObjects[i];
            Item item = itemList.items[i];
            string name = item.name;
            Vector3 startPosition = new Vector3(-1, 0, 11);
            if(!string.IsNullOrEmpty(name)) {
                if(current == null) {
                    instantiatedObjects[i] = Instantiate(plantPrefab, startPosition + new Vector3(i % 3, 0, -(i / 3)), Quaternion.identity);
                }
            } else {
                if(current != null) {
                    Destroy(current);
                    instantiatedObjects[i] = null; 
                }
            }
        }
    }
}
