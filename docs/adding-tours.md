# Adding Tours

This project now separates tour data into two layers:

1. Catalog metadata from the spreadsheet lives in [src/features/tours/data/tours.ts](/d:/Born2beDev/Travellioglobal/travellioglobal-front/src/features/tours/data/tours.ts).
2. Long-form page content lives in [src/features/tours/data/tour-content.ts](/d:/Born2beDev/Travellioglobal/travellioglobal-front/src/features/tours/data/tour-content.ts).

## Update the catalog from the XLSX

1. Replace or update `public/docs/Travellio Global - Tours + Prices.xlsx`.
2. Run:

```powershell
python scripts/generate-tour-catalog.py
```

3. Review [src/features/tours/data/tours.ts](/d:/Born2beDev/Travellioglobal/travellioglobal-front/src/features/tours/data/tours.ts).

Notes:

- The script currently imports the first 55 populated tour rows from the `Prices` tab.
- Region mapping is manual and defined in [scripts/generate-tour-catalog.py](/d:/Born2beDev/Travellioglobal/travellioglobal-front/scripts/generate-tour-catalog.py).
- If new rows belong to a different region, update `REGION_MAP` in that script before regenerating.
- `minCapacity` defaults to `1` unless a slug is listed in `MIN_CAPACITY_OVERRIDES`.

## Add a new docx-backed detail page

1. Add the new `.docx` file to `public/docs`.
2. Extract the content you want from the docx and create a new content object in [src/features/tours/data/tour-content.ts](/d:/Born2beDev/Travellioglobal/travellioglobal-front/src/features/tours/data/tour-content.ts).
3. Give that object a new `key`, for example `"paris-eiffel-sample"`.
4. In [src/features/tours/data/tours.ts](/d:/Born2beDev/Travellioglobal/travellioglobal-front/src/features/tours/data/tours.ts), change the tour's `detailContentKey` from `"ultimate-tenerife-sample"` to your new key.

## Add a tour image

1. Save the image into `public/images/tours/detail/`.
2. Update the relevant tour entry in [src/features/tours/data/tours.ts](/d:/Born2beDev/Travellioglobal/travellioglobal-front/src/features/tours/data/tours.ts) if that tour should use a different image than the shared default.

## What the booking form sends to checkout

The tour detail page adds these fields into the cart item:

- Tour date
- Tour time
- Number of participants
- Duration
- Meeting point

Those values are then used in:

- Checkout summary display
- Order notes sent to the order API

Files involved:

- [TourDetailPage.tsx](/d:/Born2beDev/Travellioglobal/travellioglobal-front/src/features/tours/ui/TourDetailPage/TourDetailPage.tsx)
- [cart.ts](/d:/Born2beDev/Travellioglobal/travellioglobal-front/src/features/cart/store/cart.ts)
- [CheckoutForm.tsx](/d:/Born2beDev/Travellioglobal/travellioglobal-front/src/features/cart/ui/CheckoutForm/CheckoutForm.tsx)
- [createOrder.ts](/d:/Born2beDev/Travellioglobal/travellioglobal-front/src/features/cart/api/createOrder.ts)

## When you add more tours later

1. Regenerate the catalog from the spreadsheet.
2. Add or update the matching long-form content object.
3. Assign the correct `detailContentKey`.
4. Add the correct image file.
5. Run:

```powershell
pnpm build
```
