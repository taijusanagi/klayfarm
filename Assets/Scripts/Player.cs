using UnityEngine;

public class Player : MonoBehaviour
{

    public float movementSpeed = 10f;

    void Start()
    {
        
    }

    void Update()
    {
        float horizontalInput = Input.GetAxis("Horizontal");
        float verticalInput = Input.GetAxis("Vertical");
        transform.position += transform.forward * verticalInput * Time.deltaTime * movementSpeed;
        transform.position += transform.right * horizontalInput * Time.deltaTime * movementSpeed;
    }
}
