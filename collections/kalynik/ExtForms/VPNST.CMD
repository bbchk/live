

::ATTENTION!!!
::Configure variables before use

::VPN Connection parameters
SET vpn_connect="Kovbasa"
SET vpn_login="Khmelnickiy"
SET vpn_password=qwerty146


::Establish VPN connection
rasdial %vpn_connect% %vpn_login% %vpn_password%

