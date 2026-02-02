import AddCustomerModal from "./AddCustomer";
import MakeSellModal from "./MakeSellModal";
import OrderDetailsModal from "./OrderDetails";
import ProductDetailsModal from "./ProductDetailsModal";

export default function SharedModals() {
    return (
        <>
            <ProductDetailsModal />
            <AddCustomerModal />
            <MakeSellModal />
            <OrderDetailsModal />
        </>
    )
}
