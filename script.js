$(document).ready(function () {
    // Function to reset input fields
    function resetInputs() {
        $('#inputUrl, #inputText, #inputNo, #inputWAMsg').val('');
        $('#qrResultFinal').hide();
        $('#qrResult').show();
        $('#url-error').text('');
        $('#generateWhatsApp').attr('disabled', true);
    }
    resetInputs();

    // Event listener for tab changes
    $('#ex-with-icons').on('click', 'a', function () {
        resetInputs();
        toggleGenerateButton($(this).attr('href'));

    });

    // Event listener for tab changes to show and hide generate button
    $('.nav-item').on('click', 'a', function () {
        let selectedTabId = $(this).attr('href');
        // alert('test for Whatsapp tab');

        if (selectedTabId === '#ex-with-icons-tabs-3') {
            $('#generateWhatsApp').show();

        } else {
            $('#generateWhatsApp').hide();
        }
        // Show Generate button for WhatsApp if it's selected

    });


    // =========== code start Keyup event listener for URL input field ===============
    $('#inputUrl').on('keyup', function () {
        let urlInput = $('#inputUrl').val();

        if ($.trim(urlInput) === '') {

            $('#downloadQR').attr('disabled', true);
            $('#qrResult').show();
            $('#qrResultFinal').hide();

        } else {
            $('#downloadQR').attr('disabled', false);
            $('#qrResult').hide();
            $('#qrResultFinal').show();
        }

        // Validate URL format
        if (!/^https?:\/\//i.test(urlInput)) {
            // alert('Please enter a valid URL starting with "http://" or "https://"');
            $('#url-error').text('Please enter a valid URL starting with "http://" or "https://"');
            $('#downloadQR').attr('disabled', true);
            $('#qrResult').show();
            $('#qrResultFinal').hide();
            return;
        } else {
            $('#downloadQR').attr('disabled', false);
            $('#qrResult').hide();
            $('#qrResultFinal').show();
            $('#url-error').text('');
        }

        // Trigger color input change event to update QR code color
        $('#colorLite, #colorDark').trigger('input');
    });
    // =========== code end Keyup event listener for URL input field ===============


    // ============ code start for Event listener for color inputs =======================

    //======= Trigger color input change event to update QR code color =====
    $('#colorLite, #colorDark').on('input', function () {
        // Get the color values
        let bgColor = $('#colorLite').val();
        let patternColor = $('#colorDark').val();

        // Get the text input value
        let textInput = $('#inputText').val();

        // Get the text input value
        let inputUrl = $('#inputUrl').val();


        let whatsappMessage = $('#inputWAMsg').val();
        let whatsappNumber = $('#inputNo').val();


        if ($.trim(textInput) !== '') {
            // Clear previous QR code
            $('#qrResultFinal').empty();

            // Generate QR Code using qrcode.js library with updated colors
            new QRCode($('#qrResultFinal')[0], {
                text: textInput,
                width: 200,
                height: 200,
                colorDark: patternColor,
                colorLight: bgColor,
                // correctLevel: QRCode.CorrectLevel.H
            });
        } else if ($.trim(inputUrl) !== '') {
            // Clear previous QR code
            $('#qrResultFinal').empty();

            // Generate QR Code using qrcode.js library with updated colors
            new QRCode($('#qrResultFinal')[0], {
                text: inputUrl,
                width: 200,
                height: 200,
                colorDark: patternColor,
                colorLight: bgColor,
                correctLevel: QRCode.CorrectLevel.H
            });
        }

        else if ($.trim(whatsappMessage) !== '' && $.trim(whatsappNumber) !== '') {

            let combineDate = "https://wa.me/" + whatsappNumber + "&text=" + encodeURIComponent(whatsappMessage);

            // Clear previous QR code
            $('#qrResultFinal').empty();


            // Generate QR Code for WhatsApp
            new QRCode($('#qrResultFinal')[0], {
                text: combineDate,
                width: 200,
                height: 200,
                colorDark: patternColor,
                colorLight: bgColor,
                correctLevel: QRCode.CorrectLevel.H
            });

        }




    });


    // Keyup event listener for Text input field
    $('#inputText').on('keyup', function () {


        var textInput = $('#inputText').val();

        if ($.trim(textInput) === '') {
            $('#downloadQR').attr('disabled', true);
            $('#qrResult').show();
            $('#qrResultFinal').hide();
        } else {
            $('#downloadQR').attr('disabled', false);
            $('#qrResult').hide();
            $('#qrResultFinal').show();
        }

        // Trigger color input change event to update QR code color
        $('#colorLite, #colorDark').trigger('input');
    });

    // ============ code end for Event listener for color inputs =======================


    // =========== code for control the generate QR for whatsapp through generate btn ============
    $('#inputWAMsg, #inputNo').on('keyup', function () {
        let whatsappMessage = $('#inputWAMsg').val();
        let whatsappNumber = $('#inputNo').val();

        if ($.trim(whatsappNumber) !== '' && $.trim(whatsappMessage) !== '') {
            // alert('test done');
            $('#generateWhatsApp').attr('disabled', false);
            $('#downloadQR').attr('disabled', true);
            $('#qrResult').show();
            $('#qrResultFinal').hide();

        } else {
            $('#downloadQR').attr('disabled', true);
            $('#qrResult').show();
            $('#qrResultFinal').hide();

            $('#generateWhatsApp').attr('disabled', true);
        }
    });

    // ========== Event listener for WhatsApp Generate button ================
    $('#generateWhatsApp').on('click', function () {
        let whatsappNumber = $('#inputNo').val();
        let whatsappMessage = $('#inputWAMsg').val();

        if ($.trim(whatsappNumber) === '' || $.trim(whatsappMessage) === '') {
            alert('Please enter WhatsApp number and message');
            return;
        }

        // Display the loader
        $('#loaderQR').removeClass('d-none');

        // Get the color values
        let bgColor = $('#colorLite').val();
        let patternColor = $('#colorDark').val();

        // Simulate QR code generation process (replace with actual generation logic)
        let combineDate = "https://wa.me/" + whatsappNumber + "&text=" + encodeURIComponent(whatsappMessage);

        // Clear previous QR code
        $('#qrResultFinal').empty();

        // Generate QR Code for WhatsApp
        new QRCode($('#qrResultFinal')[0], {
            text: combineDate,
            width: 200,
            height: 200,
            colorDark: patternColor,
            colorLight: bgColor,
            correctLevel: QRCode.CorrectLevel.H
        });

        // Add a delay before showing the final result
        setTimeout(function () {
            // Hide the loader
            $('#loaderQR').addClass('d-none');

            // Show the QR code and enable download button
            $('#downloadQR').attr('disabled', false);
            $('#qrResult').hide();
            $('#qrResultFinal').show();

            // Trigger color input change event to update QR code color
            $('#colorLite, #colorDark').trigger('input');
        }, 300); // Adjust the delay time (in milliseconds) as needed
    });




    // Event listener for download button for QR Code
    $('#downloadQR').on('click', function () {
        // Get the QR code canvas element
        var canvas = $('#qrResultFinal canvas')[0];

        // Create an anchor element
        var link = document.createElement('a');
        link.download = 'QRCode.png';

        // Convert canvas to data URL
        link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

        // Trigger download
        link.click();
    });

    // code to reset the QR Code color
    $('#resetColor').on('click', function () {
        $('#colorDark').val('#000000');
        $('#colorLite').val('#ffffff');
    });

    // Initialize current year in footer
    const currentYear = new Date().getFullYear();
    $('#getYear').text(currentYear);

    // Initialize MDB components
    initMDB({ Tab });
});
