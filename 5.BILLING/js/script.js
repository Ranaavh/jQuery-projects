$(document).ready(function() {
    // Calculate totals when quantity and price change
    $('body').on('input', 'input.quantity, input.price', function() {
        var tr = $(this).closest('tr');
        var quantity = parseFloat(tr.find('.quantity').val()) || 0;
        var price = parseFloat(tr.find('.price').val()) || 0;
        tr.find('.total').val((quantity * price).toFixed(2));
        calculateTotals();
    });

    // Add a new row
    $('body').on('click', '.add-row', function() {
        var newRow = `<tr>
            <td><input type="text" class="item" placeholder="Enter item"></td>
            <td><input type="text" class="quantity" placeholder="Enter quantity"></td>
            <td><input type="text" class="price" placeholder="Enter price"></td>
            <td><input type="text" class="total" readonly></td>
            <td>
                <button class="add-row">+</button>
                <button class="remove-row">x</button>
            </td>
        </tr>`;
        $('#billing-table tbody').append(newRow);
    });

    // Remove a row
    $('body').on('click', '.remove-row', function() {
        $(this).closest('tr').remove();
        calculateTotals();
    });

    function calculateTotals() {
        var subtotal = 0;
        $('input.total').each(function() {
            subtotal += parseFloat($(this).val()) || 0;
        });
        var tax = subtotal * 0.1; // 10% tax
        var grandtotal = subtotal + tax;

        $('#subtotal').val(subtotal.toFixed(2));
        $('#tax').val(tax.toFixed(2));
        $('#grandtotal').val(grandtotal.toFixed(2));
    }

    calculateTotals(); // Calculate totals initially
});
