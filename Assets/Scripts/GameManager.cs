using UnityEngine;

public class GameManager : MonoBehaviour
{
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
                    string idStr = param.Substring(3);
                    int id;
                    if (int.TryParse(idStr, out id))
                    {
                        Debug.Log("id: " + id);
                    }
                    else
                    {
                        Debug.Log("Invalid id format");
                    }
                    break;
                }
            }
        }
        else
        {
            Debug.Log("No query parameters provided");
        }
    }

    void Update()
    {
        
    }
}
