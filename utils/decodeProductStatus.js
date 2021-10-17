export default function decodeProductStatus(status){
    switch (status){
        case 0:
            return "NotAdded"
        case 1:
            return "Added"
        case 2: 
            return "Shipped"
        case 3: 
            return "ReceivedByWareHouse"
        case 4: 
            return "ReadyForDelivery"
        case 5:
            return "PickedUpForDelivery"
        case 6: 
            return "Received"
    }
}