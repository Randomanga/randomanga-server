import { Text, Box, Stack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { UserDropdown } from './UserDropdown';
const MenuItem = ({ children, to = '/', close, ...rest }) => {
    return (
        <Link to={to} onClick={() => close()}>
            <Text
                display="block"
                color="gray.400"
                fontSize="sm"
                fontWeight="semibold"
                fontFamily="sans-serif"
                userSelect="none"
                userSelect="-moz-none"
                _hover={{ color: 'white' }}
                {...rest}>
                {children}
            </Text>
        </Link>
    );
};

const NoAccount = ({ closeNavigation }) => {
    return (
        <Stack
            direction="row"
            align="center"
            spacing={3}
            pl={[0, 4, 10, 16]}
            pr={[0, 0, 4, 0]}
            pb={[2, 2, 0, 0]}>
            <MenuItem close={closeNavigation} to="/login">
                Login
            </MenuItem>
            <Link onClick={() => closeNavigation()} to="/sign-up">
                <Button
                    size="sm"
                    bgColor="blue.500"
                    color="gray.300"
                    _hover={{ bgColor: 'blue.600' }}
                    borderColor="white"
                    _active={{
                        bg: 'blue.400',
                        transform: 'scale(0.98)',
                        borderColor: 'white',
                    }}
                    _focus={{
                        boxShadow: '',
                    }}
                    variant="solid">
                    Sign up
                </Button>
            </Link>
        </Stack>
    );
};

const MenuLinks = ({ isOpen, toggle }) => {
    const enabled = true;
    return (
        <Box
            maxH={{ base: isOpen ? '3xl' : '0', md: '3xl' }}
            animation={'ease-in-out'}
            transition={'max-height 0.25s ease-in-out'}
            overflow={'hidden'}
            flexBasis={{ base: '100%', md: 'auto' }}>
            <Stack
                spacing={8}
                align="center"
                justify={['center', 'space-between', 'flex-end', 'flex-end']}
                direction={['column', null, 'row', 'row']}
                pt={[4, 4, 0, 0]}>
                <MenuItem close={toggle} to="/">
                    Home
                </MenuItem>
                <MenuItem close={toggle} to="/recommendations">
                    Recommendations
                </MenuItem>
                <MenuItem close={toggle} to="/top-lists">
                    Top Lists
                </MenuItem>
                {enabled ? (
                    <UserDropdown closeNavigation={toggle} />
                ) : (
                    <NoAccount closeNavigation={toggle} />
                )}
            </Stack>
        </Box>
    );
};

export { MenuLinks, MenuItem };