import { cn } from "@/lib/utils";
import { setAllCustomers } from "@/redux/features/address/addressSlice";
import { useLazyGetCustomersQuery } from "@/redux/features/customer/customerApiSlice";
import { RootState } from "@/redux/store";
import { TCustomer } from "@/types/types";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../loading/LoadingSpinner";
import RenderText from "../utils/RenderText";

export function CustomerSelect({
    register,
    setValue,
    watch,
    isOpen,
    setIsOpen,
    formState
}) {
    // hooks
    const dispatch = useDispatch()
    const [getCustomers, { isLoading }] = useLazyGetCustomersQuery();
    const { cartFormSavedData } = useSelector((state: RootState) => state.productSlice);
    const [customers, setCustomers] = useState<TCustomer[] | null>();
    const dropdownRef = useRef(null)
    const [search, setSearch] = useState("")
    const t = useTranslations("checkout");
    const selected = watch("customer")

    // Filtered addresses
    const filtered = useMemo(() => {
        return customers?.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [customers, search])

    // hanlders
    const handleSelect = (customer) => {
        setValue("customer", customer, { shouldValidate: true })
        setIsOpen(false)
        setSearch("")
    }


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getCustomers('').unwrap()
                if (res.success) {
                    dispatch(setAllCustomers(res.data));
                    setCustomers(res.data);
                }
            } catch (error) {
                console.log(error)
            }
        }

        loadData();
    }, [dispatch, getCustomers])


    useEffect(() => {
        if (!cartFormSavedData || !customers?.length) return;

        const filteredCustomer = customers.find(
            customer => customer.id === cartFormSavedData.customerId
        );
        if (!filteredCustomer) return;

        setValue("customer", filteredCustomer, { shouldValidate: true })
    }, [cartFormSavedData, customers, setValue]);


    useEffect(() => {
        if (!customers?.length) return;
        setValue("customer", customers[0], { shouldValidate: true })
    }, [setValue, customers, formState.isSubmitSuccessful])

    if (isLoading) return <div className="grow flex items-center justify-center">
        <LoadingSpinner />
    </div>

    if (!customers?.length) return;

    const selectedCustomer = customers?.find(item => item.id === selected?.id)
    return (
        <div className="prevent-body-trigger custom-select-el relative w-full" ref={dropdownRef}>
            <input type="hidden" {...register("customer")} />
            <button
                type="button"
                onClick={() => setIsOpen(v => !v)}
                className="w-full rounded-[4px] bg-body outline-none border duration-200 border-slate-400/70 focus:border-slate-500/70 text-sm  relative flex justify-between gap-4 items-center px-3 py-1.5 h-[36px]"
            >
                {!!selectedCustomer &&
                    <span className="text-base">{selectedCustomer.name}</span>
                }
                <span
                    className={cn(
                        "pointer-events-none bg-body duration-200 m-0 p-0 absolute left-3 top-1/2 -translate-y-1/2",
                        "peer-focus:top-0 peer-focus:text-[11px] peer-focus:px-1 peer-focus:left-1.5",
                        selectedCustomer && "top-0 text-[11px] px-0.5 left-2"
                    )}
                >{t('customer')}</span>
                <ChevronDown className='!w-5 !h-5' />
            </button>
            {/* Dropdown */}
            {isOpen && (
                <div className=" absolute z-[9999] top-0 w-full bg-body rounded shadow-lg border">

                    {/* Search input */}
                    <div className="p-1 border-b">
                        <input
                            type="text"
                            placeholder={t("searchCustomer")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="checkout-input"
                        />
                    </div>

                    {/* Options */}
                    <div className="max-h-[110px] overflow-y-auto">
                        {filtered && filtered?.length > 0 ? (
                            filtered.map(customer => <button
                                key={customer.id}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelect(customer);
                                }}
                                className="prevent-body-trigger w-full px-3 py-0.5 hover:bg-gray-100 text-left"
                            >
                                {customer.name}
                            </button>
                            )

                        ) : (
                            <div className="px-3 py-2 text-gray-400 dark:text-gray-200 text-sm">
                                <RenderText group='checkout' variable='noCustomerFound' />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

