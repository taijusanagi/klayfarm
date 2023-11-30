using System.Collections.Generic;


[System.Serializable]
public class Item
{
    public string name;
    public string plantedAt;
}

[System.Serializable]
public class ItemList
{
    public Item[] items;
}